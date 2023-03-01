import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './Views/LogIn/LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}>
        </Route>
        <Route path="*" element={<h1>No Page Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
