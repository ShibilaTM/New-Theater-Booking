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
import TicketRates from './Admin/AdminHome/TicketRates';
import EditTickets from './Admin/AdminHome/EditTickets';
import TicketsSold from './Admin/AdminHome/TicketsSold';
import { RequireAuth } from './Auth';
import { Logout } from './Logout';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main child={<Home />} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>  
        <Route path='/user' element={<RequireAuth><UserMain child={<UserHome />} /></RequireAuth>}/>     
        <Route path="/movie/:title" element={<RequireAuth><UserMain child={<MoviePageFinal/>} /></RequireAuth>}/> 
        <Route path="/profile" element={<RequireAuth><UserMain child={<UserProfile/>} /></RequireAuth>}/> 
        <Route path="/buytickets/:id" element={<RequireAuth><UserMain child={<MovieTicketBooking/>} /></RequireAuth>}/>
        <Route path='/logout' element={<Logout />}></Route>
       
        {/* Admin Routes */}
        <Route path='/adminlog' element={<AdminLogin/>}/>
        <Route path="/admindashboard" element={<AdminHome/>}/>
        <Route path='/moviesubmission' element={<MovieSubmission/>}/>
        <Route path='/cast/:id' element={<CastSubmission/>}/>
        <Route path='/edit/:id' element={<EditTickets/>}/>
        <Route path='/tickets/:id' element={<TicketRates/>}/>
        <Route path='/ticketsSold' element={<TicketsSold/>}/>
        
      </Routes>
    </div>
  );
}

export default App;

