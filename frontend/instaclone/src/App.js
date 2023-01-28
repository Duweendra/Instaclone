
import './App.css';
import {useEffect,useRef,useState} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RequireAuth from './components/RequireAuth';
import UserLogin from './components/login'


function App() {
  
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  
  
  
  
  
  return (
    <BrowserRouter>
    <Routes>
    {/*   <Route path="/register" element={<UserLogin/>} /> */}
      <Route path="/login" element={<UserLogin/>} />
  


      <Route element={<RequireAuth />}>
     
     {/*  <Route path="/posts" element={TimeLine/>}/>
      */}
      </Route>

   
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
