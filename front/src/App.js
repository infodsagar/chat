import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './component/navbar';
import { Home } from './pages/home';
import { Chats } from './pages/chats';
import { SocketProvider } from './context/SocketProvider';
import { ConversationsProvider } from './context/ConversationsProvider';

function App() {
  return (
    <>
      <SocketProvider>
        <ConversationsProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/chats' element={<Chats />} />
            </Routes>
          </BrowserRouter>
        </ConversationsProvider>
      </SocketProvider>
    </>
  );
}

export default App;
