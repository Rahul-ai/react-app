import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './Views/LogIn/LogIn';
import { UserList } from './Views/User/UserList';
import { UserForm } from './Views/User/UserForm';
import { CreatM } from './Views/CreateMeeting/Createmeet';
import { SocketProvider } from './Component/Socket/Socket';

function App() {
  return (
    <SocketProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/room" element={<CreatM />}></Route>
        <Route path="/UserList" element={<UserList />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/UserForm/:id" element={<UserForm />} />
        <Route path="*" element={<h1>No Page Found</h1>} />
      </Routes>
    </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
