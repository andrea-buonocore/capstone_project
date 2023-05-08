
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './style/App.scss';
import MainContainer from './components/MainContainer';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
    <Header />
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/category/:category' element={<CategoryPage />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
