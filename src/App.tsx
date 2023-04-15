import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './Views/LogIn/LogIn';
import { UserList } from './Views/User/UserList';
import { UserForm } from './Views/User/UserForm';
import { CreatM } from './Views/CreateMeeting/Createmeet';
import { SocketProvider } from './Helpers/Socket/Socket';
import { RoomPage } from './Views/CreateMeeting/Room';
import { PeerProvider } from './Helpers/Peer/Peer';

function App() {
  return (
    <SocketProvider>
    <PeerProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/room" element={<CreatM />}></Route>
        <Route path="/UserList" element={<UserList />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/UserForm/:id" element={<UserForm />} />
        <Route path="/joinedroom/:id" element={<RoomPage/>} />
        <Route path="*" element={<h1>No Page Found</h1>} />
      </Routes>
    </BrowserRouter>
    </PeerProvider>
    </SocketProvider>
  );
}

export default App;
