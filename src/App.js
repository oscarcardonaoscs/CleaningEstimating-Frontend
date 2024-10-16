import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuoteForm from "./QuoteForm";
import EstimatePage from "./EstimatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuoteForm />} />
        <Route path="/estimate" element={<EstimatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
