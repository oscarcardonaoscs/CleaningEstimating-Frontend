// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";

import Navbar from "./pages/website/components/Navbar";
import Footer from "./Footer";
import Home from "./pages/website/Home";
import ServiceCarousel from "./pages/website/ServiceCarousel";
import QuoteForm from "./QuoteForm";
import EstimatePage from "./EstimatePage";
import ConfirmationPage from "./ConfirmationPage";
import ChineloPage from "./ChineloPage";
import PrivacyPolicy from "./pages/website/components/PrivacyPolicy";
import BusinessCard from "./pages/website/components/BusinessCard";
import PaymentOptionsCard from "./pages/website/components/PaymentOptionsCard";

ReactGA.initialize("G-1LB29362HR");

function Layout() {
  const location = useLocation();
  const isCardPage = location.pathname === "/business-card";

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      {" "}
      {/* <= agregado */}
      {!isCardPage && <Navbar />}
      <div
        className={`flex-grow ${
          isCardPage ? "flex justify-center items-center" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrusel" element={<ServiceCarousel />} />
          <Route path="/estimating" element={<QuoteForm />} />
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/chinelo" element={<ChineloPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/business-card" element={<BusinessCard />} />
          <Route path="/pay" element={<PaymentOptionsCard />} />
        </Routes>
      </div>
      {!isCardPage && <Footer />}
    </div>
  );
}

function App() {
  useEffect(() => {
    ReactGA.send("pageview");
  }, []);

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
