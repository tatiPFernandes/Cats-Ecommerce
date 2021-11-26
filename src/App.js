import { useEffect, useRef, useState } from "react";
import "./App.css";
// import catLogo from './images/CatLogo.jpg';
import logo from "./images/00.png";
import faker, { address } from "faker";

const delay = 2500;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [data, setData] = useState([]);
  const [basketTotal, setbasketTotal] = useState([]);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [cats, setCats] = useState([]);

  // API Handler

  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      setCats(data);
      console.log(data);
      setLoading(false);
    } catch (e) {
      setError({ error: true, message: e.message });
    }
  };

  useEffect(() => {
    handler();
  }, []);

  // Modal Open/Close

  const [open, setOpen] = useState();

  const Modal = () => {
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
      <div>
        <button onClick={onOpenModal}>Open Modal</button>
        <Modal open={open} onClose={onCloseModal} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  };

  // add and remove to basket

  const AddtoCart = (Price) => {
    let basketTotalPrice = parseInt(basketTotal) + parseInt(Price);
    setBasketTotal(basketTotalPrice);
  };

  const activeBasket = (index) => {
    let storedBasket = [...basket];
    storedBasket.push(index);
    setBasket(storedBasket);
    address(item.Price);
  };

  const removefromCart = (Price) => {
    let basketTotalPrice = parseInt(basketTotal) - parseInt(price);
    setbasketTotal(basketTotalPrice);
  };
  const removeHandler = (index, price) => {
    let storedList = [...basket];
    storedList.splice(index, 1);
    setBasket(storedList);
    minus(price);
  };

  // Slideshow Functionality

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(
  //     () =>
  //       setIndex((prevIndex) =>
  //         prevIndex === cats.length - 1 ? 0 : prevIndex + 1
  //       ),
  //     delay
  //   );
  //   return () => {
  //     resetTimeout();
  //   };
  // }, [index]);

  // if (error.error) {
  //   return <h1>{error.message}</h1>;
  // }

  // Home Page

  return (
    <div>
      {/* Nav Bar */}

      <div className="nav-bar">
        <nav className="pages">
          <a href="#">Home</a>
          <a href="#">Cats</a>
          <a href="#">Checkout</a>
          <span className="basket">
            <img className="navBasket" src={basket} alt="Basket-Icon" />
          </span>
        </nav>
      </div>

      {/* Title */}

      <div id="logo">
        <img src={logo} alt="Cats4Lyf" />
      </div>

      {/* Slideshow

      <div>
        <div id="slideshow">
          <div className="slideshow">
            <div className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {cats.map((cat, index) => {
                return (
                  <img className="slide" key={index} src={cat.url} alt="Cat" />
                )
              })}
            </div>
            <div className="slideshowDots">
              {cats.map((_, idx) => (
                <div
                  key={idx}
                  className={`slideshowDot${index === idx ? " active" : ""}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div> */}

      {/* Cat Elements */}

      <div className="row">
        {cats ? (
          <>
            {cats.map((cat, index) => {
              return (
                // Individual Cat Card

                <div className="card-space">
                  <div className="card">
                    <p>Name: {faker.name.firstName()}</p>
                    <img src={cat.url} alt="Cat-Picture" />
                    <p>Price: ${faker.finance.amount()}</p>

                    <div>
                      <button className="addToBasket">Add to Basket</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="loading">
            <span className="dot1"></span>
            <span className="dot2"></span>
            <span className="dot3"></span>
          </div>
        )}
      </div>

      {/* Page Footer */}

      <div>
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
          <div>
            <a href="#">Contact us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
