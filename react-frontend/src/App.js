import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GirisEkrani from "./pages/GirisEkrani";
import MesajEkrani from "./pages/MesajEkrani";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GirisEkrani />} />
          <Route path="/mesaj-ekrani" element={<MesajEkrani />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
