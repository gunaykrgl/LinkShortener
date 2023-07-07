import React from "react"
import { useState, useEffect } from "react";
import { nanoid } from "nanoid"
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore"
import { firebaseConfig } from './firebase'
import { linksCollection } from './firebase'

export default function HomePage() {
    const [inputValue, setInputValue] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const newLink = {
        longUrl: inputValue,
        shortUrl: nanoid()
      }
      await addDoc(linksCollection, newLink)
      
      // Reset the input value
      setInputValue('');
    };
    useEffect(()=>{
      const unsubscribe = onSnapshot(linksCollection, function(snapshot){
        const linksArr = snapshot.docs.map(doc =>({
          ...doc.data()
        }))
      })
      return unsubscribe
    }, [])
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };
  
    return (
      <div className='container'>
        <h1>Shorten Links</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter long url"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button type="submit">Shorten it</button>
        </form>
      </div>
    );
  }