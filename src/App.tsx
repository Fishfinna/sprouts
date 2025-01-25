import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/dashboard";
import "./App.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="home" element={<p>home</p>} />
          <Route path="*" element={<p>error page</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
