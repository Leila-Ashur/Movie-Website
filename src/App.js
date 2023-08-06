// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/GetMovies/Navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetMovies from './Components/GetMovies';
import Footer from './Components/GetMovies/Footer/footer';
import MovieDetails from './Components/GetMovies/Detail/detals';
import MovieSlider from './Components/GetMovies/Slides';



function App() {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
       {<MovieSlider/>}
      
       
        <Routes>
          <Route path='/' element={<GetMovies />} />
          <Route path='/movies/:movieId' element={<MovieDetails/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
