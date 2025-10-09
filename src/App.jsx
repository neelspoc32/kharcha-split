
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KharchaMenu from "./components/KharchaMenu";
import KharchaEntries from "./components/KharchaEntries";
import KharchaMain from "./components/KharchaMain"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<KharchaMenu />} />
        <Route path="/entries/:eventId" element={<KharchaMain />} />
      </Routes>
  );
}
