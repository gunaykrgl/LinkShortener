import { useState, useEffect } from 'react'
import './App.css'
import { nanoid } from "nanoid"
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore"
import { firebaseConfig } from './firebase'
import { linksCollection } from './firebase'
import HomePage from './HomePage'
import Redirect from './Redirect'

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App(){
  return     (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/:id" element={<Redirect />}/>
      </Routes>
    </BrowserRouter>

    )

}

export default App
