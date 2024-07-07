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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </Router>
  );
};

export default App;