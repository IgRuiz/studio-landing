import { ScrollGradient } from './components/ScrollGradient';
import { Hero } from './sections/Hero';
import { Quote1 } from './sections/Quote1';
import { StudioSlider } from './sections/StudioSlider';
import { Quote2 } from './sections/Quote2';
import { Services } from './sections/Services';
import { WhyUs } from './sections/WhyUs';
import { BottomCTA } from './sections/BottomCTA';
import './App.scss';

function App() {
  return (
    <>
      <ScrollGradient />
      <main>
        <Hero />
        <Quote1 />
        <StudioSlider />
        <Quote2 />
        <Services />
        <WhyUs />
        <BottomCTA />
      </main>
    </>
  );
}

export default App;
