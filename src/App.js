import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Login from './login/Login';
import Navbar from './NavBar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
