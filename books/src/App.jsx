import './App.css'
import Books from './components/Books'
import Form from './components/Form'
import Navbar from './components/Navbar'
import { Route , Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Books/>}/>
      <Route path='/register' element={<Form/>}/>

    </Routes>
    </>
  )
}

export default App
