import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TaskPage from "./pages/TaskPage";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/task/:id" element={<TaskPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
