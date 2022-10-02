import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './component/navbar';
import { LoginForm } from './pages/loginForm';
import { SignupForm } from './pages/signupForm';
import { Notes } from './pages/notes';
import { Home } from './pages/home';
import { useAuthContext } from './hooks/useAuthContext';
import { Chats } from './pages/chats';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={!user ? <LoginForm /> : <Navigate to='/notes' />}
          />
          <Route
            path='/signup'
            element={!user ? <SignupForm /> : <Navigate to='/notes' />}
          />
          <Route
            path='/notes'
            element={user ? <Notes /> : <Navigate to='/login'></Navigate>}
          />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
