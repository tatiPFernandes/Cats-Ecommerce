import { useEffect, useState } from "react";
import React from 'react';
import './App.css';
import faker from 'faker'; 




const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [cats, setCats] = useState([]);
  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Something got wrong");
      }
      
      const data = await response.json();
    
      setCats(data);
      console.log(data)
      setLoading(false);
    } catch (e) {
      setError({ error: true, message: e.message });
    }
  };
 
  useEffect(() => {
    handler();
  }, []);

  if (error.error) {
    return <h1>{error.message}</h1>;
  }

   
  return (
    <div>
      <h1>Cats</h1>
      {cats ? (
        <>
               {cats.map((cat, index) => {
                return <div>
                  <img src ={cat.url} alt =""></img>
                </div>
               
            })}
          </>
              
      ) : (
        <h1>loading cats...</h1>
      )}
    </div>
  );
};





export default App;
  

    



