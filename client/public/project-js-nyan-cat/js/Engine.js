class Bonus{
  constructor(root, num){
  this.x = (num * PLAYER_WIDTH) + 2;
  this.y = 240;
  this.bONus = true;
  this.domElement = document.createElement('img');
  this.domElement.src = 'images/bstar.png';
  this.domElement.style.position = 'absolute';
  this.domElement.style.left = `${this.x}px`;
  this.domElement.style.top = ` ${this.y}px`;
  this.domElement.style.zIndex = '100';
  root.appendChild(this.domElement);
  this.sound = document.createElement("audio");
  this.sound.volume = 0.8;
  this.source = document.createElement("source");
  this.sound.appendChild(this.source);
  this.source.src = "./audio/starsound.ogg";
}
}


// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    this.player2 = new Player(this.root);
    this.bonus = new Bonus(this.root, 0);

    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game

    // addBackground(this.root);//this was transfered to main.js

    //added
    this.score = 0;
    this.life = 3;

    this.paused = false;
    this.text = new Text(this.root, 10, 10, "1.score");
    this.tlives = new Text(this.root, 270, 10, " ");

    // this.text = new Text(theRoot, 55, 55);
    this.text.update("score: " + this.score);
    this.tlives.update("Lives "+ this.life);
    //player2
    this.score2 = 0;
    this.life2 = 3;
    // this.text2 = new Text(this.root, 10, 40, "2.score");
    this.tlives2 = new Text(this.root, 270, 40, ")");
    // this.text2.update("2.score: " + this.score);
    this.tlives2.update("Lives "+ this.life);


    this.gameON = false;

    this.bonusON = false; 
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.gameON) {
      
   
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
    enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
    if (enemy.destroyed) {
          this.score = this.score + 10;
          this.text.update("score: " + this.score);
    }

    return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      let finalScore = this.score;
      // this.on = false;
      let response = confirm("restart?");
      if (response) {
        location.reload();
      } else {
        window.alert(`Game over\n\n  Your Score ${finalScore}`);
      }
      return;
    }
    }
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    if (this.paused) {
      // setTimeout(this.gameLoop, infinite);
      // clearTimeout(this.gameLoop);
    }else
    {
      setTimeout(this.gameLoop, 20);}
  };

  gameBonus = () => {
    if (this.gameON && !this.paused) {
      console.log("GAME BONUS! ");

    this.bonus.domElement.remove();


    if (!this.bonusON) {
      let num = Math.floor((Math.random() * 10)/2);
      console.log("GAME BONUS ", num);
      this.bonus = new Bonus(this.root, num);
      this.bonusON = true;
    }
    else if (this.bonusON) {
      console.log("waiting")
      this.bonusON = false;
    }
    }
    setTimeout(this.gameBonus, 4000);
  }
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {

      //Bonus thing
      //player1
      if(
        this.player.x < this.bonus.x + PLAYER_WIDTH  && //p.left < b.righ
        this.player.y < this.bonus.y + PLAYER_HEIGHT && //p.up   < b.down
        this.player.x + PLAYER_WIDTH > this.bonus.x && //p.righ > b.left
        this.player.y + PLAYER_HEIGHT > this.bonus.y)//  p.down > b.up
          {
          // justOnce = false;
          // this.bonus.bONus = true;
          // delete(enemy);
          // this.bonus.domElement.style.top = `-${this.y}px`;
          this.bonus.sound.play();
          this.bonus.domElement.style.display = `none`;
          if (this.bonus.bONus) {
            console.log("Engine.js BONUSBONUSBONUS! (isPlayerDead)");
            if (this.bonus.bONus) {
              this.life = this.life +1;
              this.tlives.update("Lives "+ this.life);
              this.score = this.score + 200;
            }
            // this.bonus.domElement.remove();
            // this.bonus.domElement.remove();
            // this.domElement.style.left = `${this.x}px`;
            this.bonus.bONus = false;
            this.bonusON = false;
          }
          // this.bonus.remove();
        }
        //player2
        if(
          this.player2.x < this.bonus.x + PLAYER_WIDTH  && //p.left < b.righ
          this.player2.y < this.bonus.y + PLAYER_HEIGHT && //p.up   < b.down
          this.player2.x + PLAYER_WIDTH > this.bonus.x && //p.righ > b.left
          this.player2.y + PLAYER_HEIGHT > this.bonus.y)//  p.down > b.up
            {
              this.bonus.sound.play();
              this.bonus.domElement.style.display = `none`;
              if (this.bonus.bONus) {
                console.log("Engine.js BONUSBONUSBONUS! (isPlayerDead)");
                if (this.bonus.bONus) {
                  this.life2 = this.life2 +1;
                  this.tlives2.update("Lives "+ this.life2);
                  this.score = this.score + 200;
                }
                this.bonus.bONus = false;
                this.bonusON = false;
              }          
          }
//enemies
      this.enemies = this.enemies.filter(enemy =>{
      // let justOnce = true;
      // if (justOnce) 
      if(
      this.player.x < enemy.x + ENEMY_WIDTH  && //p.left < e.righ
      this.player.y < enemy.y + ENEMY_HEIGHT && //p.up   < e.down
      this.player.x + PLAYER_WIDTH > enemy.x && //p.righ > e.left
      this.player.y + PLAYER_HEIGHT > enemy.y)//  p.down > e.up
        {
        // justOnce = false;
        //audioENEMY
        enemy.sound.play();
        enemy.destroyed =true;
        // delete(enemy);
        console.log("Engine.js TOUCH! (isPlayerDead)");
        this.life = this.life -1;
        this.tlives.update("Lives "+ this.life);
        enemy.domElement.remove();
      }
      //player2
      if(
        this.player2.x < enemy.x + ENEMY_WIDTH  && //p.left < e.righ
        this.player2.y < enemy.y + ENEMY_HEIGHT && //p.up   < e.down
        this.player2.x + PLAYER_WIDTH > enemy.x && //p.righ > e.left
        this.player2.y + PLAYER_HEIGHT > enemy.y)//  p.down > e.up
          {
          // justOnce = false;
          //audioENEMY
          enemy.sound.play();
          enemy.destroyed =true;
          // delete(enemy);
          console.log("Engine.js TOUCH! (isPlayerDead)");
          this.life2 = this.life2 -1;
          this.tlives2.update("Lives "+ this.life2);
          enemy.domElement.remove();
        }
      //
      return !enemy.destroyed;
    })

    if (this.life  <= 0) {
      this.tlives.update("Lives 0");//not working... 
      this.player.y = GAME_HEIGHT + PLAYER_HEIGHT;
      this.player.domElement.remove();
      if (this.life2 <= 0) {
        return true;
      }
    }    
    //player2
    if (this.life2  <= 0) {
      this.tlives2.update("Lives 0");//not working... 
      this.player2.y = GAME_HEIGHT + PLAYER_HEIGHT;
      this.player2.domElement.remove();
      if (this.life <= 0) {
        return true;
      }
    }
    //
    return false;
  };

  pause = () => {
    this.paused = !this.paused;
    if (!this.paused) {
      this.lastFrame = new Date().getTime();
      setTimeout(this.gameLoop, 20);
      console.log("Engine.js return from pause (pause)")
    }
  }
}
