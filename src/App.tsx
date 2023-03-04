import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './Views/LogIn/LogIn';
import { RTable } from './Component/Table/RTable';
import { UserList } from './Views/User/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignIn />}></Route>
        <Route path="/" element={<UserList />} />
        <Route path="*" element={<h1>No Page Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
