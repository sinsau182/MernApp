import './App.css';
import Create from './Components/Create';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Update from './Components/Update';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Create />} />
          <Route path='/all' element={<Home />} />
          <Route path='/:id' element={<Update />} />
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
