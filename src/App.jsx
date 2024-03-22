import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Goods from "./pages/Goods";
import Add from "./pages/Add";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Goods />} />
          <Route path="/add/:id" element={<Add />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
