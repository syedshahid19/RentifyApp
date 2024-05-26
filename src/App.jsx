import './App.css';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import { Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Properties from './pages/Properties';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddProperty from "./components/core/Dashboard/AddProperty"
import UpdateProperty from "./components/core/Dashboard/UpdateProperty"
import { ACCOUNT_TYPE } from './utils/constants';


function App() {

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar/>
      <div className="flex-1 overflow-y-auto relative">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        { ACCOUNT_TYPE.SELLER === 'Seller' && (
          <Route path='/dashboard/seller' element={<Dashboard/>}/>
        )}
        <Route path='/createProperty' element={<AddProperty/>}/>
        <Route path='/updateProperty/:id' element={<UpdateProperty/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
