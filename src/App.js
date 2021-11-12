import React, { useEffect, useRef, useSate } from 'react';
import './App.css';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 
import { } 'firebase/compat/auth'; 

import { useAuthSate } from 'react-firebase-hooks/auth'; 
import { useCollectionData } from 'react-firebase-hooks/firestore'; 

const firebaseConfig = { 
  //
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth(); 
const firestore = firebase.firestore(); 

const [user] = useAuthSate(auth); 

function App() {
  return (
    <div className="App">
      <header>

      </header>

      <section> 
        {user ? <ChatRoom /> : <LogIn />}
      </section> 


    </div>
  );
}

function LogIn() { 

  const signInWithGmail = () => { 
    const provider = new firebase.auth.GoogleAuthProvider(); 
    auth.signinWithPopup(provider); 
  } 

  return ( 
    <button onClick={signInWithGmail}>Sign in with Google Account</button>
  )
}

function LogOut() { 

  const sign_out = auth.signOut()

  return auth.currentUser && ( 
    <button onClick={sign_out}>Sign Out</button>
  )
}

function ChatRoom() { 

  const messagesCollection = firestore.collection('messages'); 
  const query = messagesCollection.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return ( 
    <> 
      <div> 
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>


    </>
  )
} 


function ChatMessage(props) { 

  const { text, uid } = props.message;

  return ( 
    <p>{text}</p>
  )
}




export default App;
