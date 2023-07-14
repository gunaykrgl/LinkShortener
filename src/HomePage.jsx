import React from "react"
import { useState, useEffect } from "react";
import { onSnapshot, addDoc, deleteDoc } from "firebase/firestore"
import { linksCollection } from './firebase'
import { generateId } from "./random";
import "./HomePage.css"
import Alert from "./Alert";

const domainName = "https://link-shortener-50284.web.app/"
let timer;

function isLink(str){
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  return urlPattern.test(str);
}

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
      if (isLink(inputValue)) {
        const newLink = {
          longUrl: validateUrl(inputValue),
          ID: generateId(6)
        }
  
        await addDoc(linksCollection, newLink)
        setShortUrl(newLink.ID)
        // Reset the input value
        setInputValue('');
      }
    };
  
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
      clearTimeout(timer)
      timer = setTimeout(()=>{
        setShowAlert(false)
      }, 1000)
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
          {showAlert &&  <Alert />}
        </div>
      </>
    );
  }