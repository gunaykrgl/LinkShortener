import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linksCollection } from './firebase';
import { onSnapshot } from 'firebase/firestore';

export default function Redirect() {
    const {id} = useParams()
    useEffect(()=>{
        const unsubscribe = onSnapshot(linksCollection, (snapshot)=>{
            const linksArr = snapshot.docs.map(doc => doc.data())
            for (let linkPair of linksArr){
                if (linkPair.ID === id){
                    window.location.replace(linkPair.longUrl)
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