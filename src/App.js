import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuoteForm from "./QuoteForm";
import EstimatePage from "./EstimatePage";
import ConfirmationPage from "./ConfirmationPage";
import ChineloPage from "./ChineloPage";

import Footer from "./Footer";
import PrivacyPolicy from "./pages/website/components/PrivacyPolicy";

import Home from "./pages/website/Home";
import ServiceCarousel from "./pages/website/ServiceCarousel";
import Navbar from "./pages/website/components/Navbar";

import React, { useEffect } from "react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-1LB29362HR");

function App() {
  useEffect(() => {
    ReactGA.send("pageview");
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrusel" element={<ServiceCarousel />} />
            <Route path="/estimating" element={<QuoteForm />} />
            <Route path="/estimate" element={<EstimatePage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/chinelo" element={<ChineloPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
