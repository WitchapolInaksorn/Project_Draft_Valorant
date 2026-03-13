import { BrowserRouter, Routes, Route } from "react-router-dom";

import Setup from "./pages/setup";
import Draft from "./pages/ban";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/draft" element={<Draft />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
