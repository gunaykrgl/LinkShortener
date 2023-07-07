import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linksCollection } from './firebase';
import { QuerySnapshot, onSnapshot } from 'firebase/firestore';

function validateUrl(url){
    // if url doesn't start with http, add http
    if (!url.startsWith("http://") && !url.startsWith("https://")){
        return `https://${url}`
    }
    return url
}

export default function Redirect() {
    const {id} = useParams()
    useEffect(()=>{
        const unsubscribe = onSnapshot(linksCollection, (snapshot)=>{
            const linksArr = snapshot.docs.map(doc => doc.data())
            
            for (let linkPair of linksArr){
                if (linkPair.shortUrl === id){
                    window.location.replace(validateUrl(linkPair.longUrl))
                }
            }
        })
        return unsubscribe
    }, [])
    return (
      <div>
        Redirecting...
      </div>
  );
}