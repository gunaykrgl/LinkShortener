import HomePage from './HomePage'
import Redirect from './Redirect'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/:id" element={<Redirect />}/>
      </Routes>
    </BrowserRouter>
    )

}

export default App
