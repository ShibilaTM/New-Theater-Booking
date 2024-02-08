import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Main from './components/Navbar/Main';
import UserHome from './components/Home/UserHome';
import UserMain from './components/Navbar/UserMain';
import Login from './components/ui-components/Login';
import Signup from './components/ui-components/Signup';
import AdminLogin from './components/ui-components/AdminLogin';
import MoviePageFinal from './Pages/MoviePageFinal';
import AdminHome from './Admin/AdminHome/AdminHome';
import AdminMain from './Admin/Sidebar/AdminMain';
import MovieTicketBooking from './Pages/BuyTickets/MovieTicketBooking';
import MovieSubmission from './Admin/AdminHome/MovieSubmission';
import CastSubmission from './Admin/AdminHome/CastSubmission';
import EditMovie from './Admin/AdminHome/EditMovie';
import UserProfile from './Pages/UserProfile';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main child={<Home />} />}/>
        <Route path='/user' element={<UserMain child={<UserHome />} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/adminlog' element={<AdminLogin/>}/>
        <Route path="/movie/:title" element={<UserMain child={<MoviePageFinal/>} />}/> 
        <Route path="/profile" element={<UserMain child={<UserProfile/>} />}/> 
        <Route path="/buytickets/:id" element={<UserMain child={<MovieTicketBooking/>} />}/>
       
        {/* Admin Routes */}
        <Route path="/admindashboard" element={<AdminHome/>}/>
        <Route path='/moviesubmission' element={<MovieSubmission/>}/>
        <Route path='/cast/:id' element={<CastSubmission/>}/>
        <Route path='/edit/:id' element={<EditMovie/>}/>
        
      </Routes>
    </div>
  );
}

export default App;

