import React from "react"
import { useState, useEffect } from "react";
import { onSnapshot, addDoc } from "firebase/firestore"
import { linksCollection } from './firebase'
import { generateId } from "./random";
import "./HomePage.css"
import Alert from "./Alert";

const domainName = "https://link-shortener-50284.web.app/"
// const domainName = "http://localhost:5173/"

function validateUrl(url){
  // if url doesn't start with http, add http
  if (!url.startsWith("http://") && !url.startsWith("https://")){
      return `https://${url}`
  }
  return url
}

export default function HomePage() {
    const [inputValue, setInputValue] = useState('');
    const [shortUrl, setShortUrl] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const newLink = {
        longUrl: validateUrl(inputValue),
        shortUrl: generateId(6)
      }
      await addDoc(linksCollection, newLink)
      setShortUrl(newLink.shortUrl)
      // Reset the input value
      setInputValue('');
    };
    // useEffect(()=>{
    //   const unsubscribe = onSnapshot(linksCollection, function(snapshot){
    //     const linksArr = snapshot.docs.map(doc =>({
    //       ...doc.data()
    //     }))
    //   })
    //   return unsubscribe
    // }, [])
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };

    const copy = async () => {
      await navigator.clipboard.writeText(domainName+shortUrl);
      setShowAlert(true)
      timer = setTimeout(()=>{
        setShowAlert(false)
      }, 1000)
      clearTimeout(timer)
    }

    return (
      <>
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

          <div className="output">
            <span id="uneditableText">{shortUrl&&domainName+shortUrl}</span>
            <button id="copyButton" onClick={copy}>Copy</button>
          </div>
          {showAlert &&  <Alert  />}
        </div>
      </>
    );
  }