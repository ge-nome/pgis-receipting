import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generator from "./generate";
import Signs from "./Signs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signs/>}/>
        <Route path="/generator" element={<Generator/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
