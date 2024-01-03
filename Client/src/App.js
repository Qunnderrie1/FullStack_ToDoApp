
import './App.css';
import Navbar from './Component/Navbar';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile'
import { Routes, Route} from 'react-router-dom'
import PrivateRoute from './Component/PrivateRoute';
import NotFound from './Pages/NotFound';




function App() {
  return (
    <div className="App"> 
      <Navbar />


      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />

        {/* Private Route for only user that are logged in. */}
        <Route element={<PrivateRoute />} >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
