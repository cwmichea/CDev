import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectSimon from './components/ProjectSimon';
import ProjectCat from './components/ProjectCat';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import ProjectTic from './components/ProjectTic';
import HiddenForm from './components/HiddenForm';
import Quiz from './components/Quiz';
import Quiz1 from './components/Quiz1';
import Quiz2 from './components/Quiz2';

const App = () => {
  return (
    <Router>
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/1Simon" element={<ProjectSimon/>} />
        <Route path="/projects/2Cat" element={<ProjectCat/>} />
        <Route path="/projects/3Tic" element={<ProjectTic/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact2" element={<HiddenForm />} />
        <Route path="/q" element={<Quiz />} />
        <Route path="/q1" element={<Quiz1 />} />
        <Route path="/q2" element={<Quiz2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </Router>
  );
};

export default App;