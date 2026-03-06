import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import SidebarCart from './components/SidebarCart';
import { CartProvider } from './context/CartContext';
import CheckoutModal from './components/CheckoutModal';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

//Normalização do Scroll
ScrollTrigger.normalizeScroll(true);

function App() {
  //Gerencia o ciclo de vida da animação de forma nativa no React
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      smoothTouch: 0.1,
      effects: true,
    });

    //Efeito Parallax diferentes para 'mobile' e 'Desktop'
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      smoother.effects(".hero-body", { speed: 0.6 });
      
      return () => { 
        gsap.set(".hero-body", { clearProps: "all" }); 
      };
    });

    //Evita o erro de 'getScrollFunc' se a página for recarregada
    return () => {
      smoother.kill();
    };
}, []);

  return (
    <CartProvider>
      <div className="App">
          <Header />
          <div id="smooth-wrapper">
              <div id="smooth-content">
                  <Main />
                  <Footer />
              </div>
          </div>
          <SidebarCart />
          <CheckoutModal />
      </div>
    </CartProvider>
  );
}

export default App;