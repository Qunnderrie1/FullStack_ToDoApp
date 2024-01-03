
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
        <Route path='/FullStack_ToDoApp/' element={<Login />} />
        <Route path='/FullStack_ToDoApp/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />

        {/* Private Route for only user that are logged in. */}
        <Route element={<PrivateRoute />} >
        <Route path='/FullStack_ToDoApp/dashboard' element={<Dashboard />} />
        <Route path='/FullStack_ToDoApp/profile' element={<Profile />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
