
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/App.scss';
import MainContainer from './components/MainContainer';
import CategoryPage from './components/CategoryPage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ThankYou from './components/ThankYou';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<MainContainer />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/signup' element={<SignUp />} />    
          <Route path='/thankyou' element={<ThankYou />} />    
          <Route path='/profile' element={<Profile />} />    
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
