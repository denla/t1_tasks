import { Button } from "@/components/ui/button";

// function App() {
//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center">
//       <Button>Click me</Button>
//     </div>
//   );
// }

// export default App;

// import { Button } from "@/components/ui/button";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TaskPage from "./pages/TaskPage";
// import Home from "@/pages/Home";
// import About from "@/pages/About";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/task/:id" element={<TaskPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
