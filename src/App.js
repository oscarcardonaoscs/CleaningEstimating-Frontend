import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuoteForm from "./QuoteForm";
import EstimatePage from "./EstimatePage";
import ConfirmationPage from "./ConfirmationPage";

function App() {
  return (
    <div className="min-h-screen bg-[#E3FEFF] flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<QuoteForm />} />
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
