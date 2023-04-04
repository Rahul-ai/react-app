import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './Views/LogIn/LogIn';
import { RTable } from './Component/Table/RTable';
import { UserList } from './Views/User/UserList';
import { UserForm } from './Views/User/UserForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/UserList" element={<UserList />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/UserForm/:id" element={<UserForm />} />
        <Route path="*" element={<h1>No Page Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
