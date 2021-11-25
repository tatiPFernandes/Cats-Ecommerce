import { useState, useEffect, React } from 'react';
import basket from './images/BasketIcon.png';
import catLogo from './images/CatLogo.jpg';
import './App.css';


function App() {

  const [catImage, setCatImage] = useState("");
  const [catName, setCatName] = useState("");

  const catImg = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    setCatImage(data[0].url);
  }

  useEffect(() => {
    catImg();
  }, [])

  return (

    <div>

      <div className="nav-bar">
        <nav className="pages">
          <a href="#">Home</a>
          <a href="#">Cats</a>
          <a href="#">Checkout</a>
          <span className="basket"><img src={basket} alt="Basket-Icon" /></span>
        </nav>

      </div>

      <div>
        <h1>Cats4Lyf</h1>
      </div>

      <div className="logo">
        <img src={catLogo} alt="Cat Logo" />
      </div>

      <div className="card-space">

        <div className="card">
          <p>John</p>
          <img src={catImage} alt="Test" />
          <p>Price: £499</p>
          <div className="spacer">
            <button id="buyItem">Buy</button>
          </div>
          <div className="spacer">
            <button id="addToBasket">Add to basket</button>
          </div>
        </div>

      </div>

      <div className="footer">
        <div>
          <a href="#">Home</a>
        </div>
        <div>
          <a href="#">Cats</a>
        </div>
        <div>
          <a href="#">Checkout</a>
        </div>
      </div>

    </div>

  )
}

export default App;
