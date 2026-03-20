import { useReveal } from './hooks/useReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CodeParticles from './components/CodeParticles';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useReveal();

  return (
    <>
      <div className="background-overlay"></div>
      <div className="glow-orb"></div>
      <CodeParticles />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Blogs />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
