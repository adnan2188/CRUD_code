import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Create_form from './pages/Create_form.jsx';
import Read_form from './pages/Read_form.jsx';
import Update_form from './pages/Update_form.jsx';
import Delete_form from './pages/Delete_form.jsx'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create_form />} />
        <Route path='/update/:id' element={<Update_form />} />
        <Route path='/delete/:id' element={<Delete_form />} />
        <Route path='/read/:id' element={<Read_form />} />
      </Routes>
    </>
  )
}

export default App
