
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './style/App.scss';
import MainContainer from './components/MainContainer';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<MainContainer />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
