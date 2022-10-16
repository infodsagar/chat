import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './component/navbar';
import { Home } from './pages/home';
import { Chats } from './pages/chats';
import { SocketProvider } from './context/SocketProvider';
import { ConversationsProvider } from './context/ConversationsProvider';
import { UsernameContextProvider } from './context/UsernameProvider';

function App() {
  return (
    <>
      <UsernameContextProvider>
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
      </UsernameContextProvider>
    </>
  );
}

export default App;
