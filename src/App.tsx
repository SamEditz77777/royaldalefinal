import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import DoorSizes from './components/DoorSizes';
import QuoteForm from './components/QuoteForm';
import WhatsAppCTA from './components/WhatsAppCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-beige-100 text-brown-800 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyChooseUs />
        <DoorSizes />
        <QuoteForm />
        <WhatsAppCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
