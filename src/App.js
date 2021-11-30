import { React, useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import './App.css';
import basket from './images/BasketIcon.png';
// import catLogo from './images/CatLogo.jpg';
import logo from './images/00.png';
import faker from 'faker';

// £ $ €

const delay = 2500;

const App = () => {

  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [cats, setCats] = useState([]);
  const timeoutRef = useRef(null);

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  // API Handler

  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Something got wrong");
      }

      const data = await response.json();

      for (let i = 0; i < 9; i++) {
        cats.push({ ItemName: faker.name.firstName(), ItemUrl: data[i], ItemPrice: faker.finance.amount() })
        setCats(cats)
      }

      setLoading(false);

    } catch (e) {
      setError({ error: true, message: e.message });
    }
  };

  useEffect(() => {
    handler();
  }, []);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const itemAdd = (name, price) => {
    basketItems.push({ ItemName: name, ItemPrice: price })
    setBasketItems(basketItems);
    setTotalPrice(totalPrice + basketItems[0].ItemPrice);
    console.log(totalPrice);
    console.log(basketItems);
  }

  // <p>Name: {faker.name.firstName()}</p>
  // <img src={cat.url} alt="Cat-Picture" />
  // <p>Price: ${faker.finance.amount()}</p>

  // Modal Open/Close

  // const [open, setOpen] = useState();

  // const Modal = () => {
  //   const onOpenModal = () => setOpen(true);
  //   const onCloseModal = () => setOpen(false);

  //   return (
  //     <div>
  //       <button onClick={onOpenModal}>Open Modal</button>
  //       <Modal open={open} onClose={onCloseModal} center>
  //         <h2>Simple centered modal</h2>
  //       </Modal>
  //     </div>
  //   );
  // };

  // Slideshow Functionality

  // function resetTimeout() {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }

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
          <span className="basket"><img src={basket} alt="Basket-Icon" onClick={openModal} /></span>
          <Modal isOpen={modal}>
            <button onClick={closeModal}>Close Basket</button>
            <h1>Basket</h1>
            <div>
              {basketItems ? (
                <>
                  {basketItems.map((item, index) => {
                    return (
                      <div>
                        <span>{item.ItemName}</span>
                        <span>{item.ItemPrice}</span>
                        <span> + </span>
                        <span> - </span>
                      </div>
                    )
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
            <div>
              <h1>Total price</h1>
              <p>£{totalPrice}</p>
            </div>
          </Modal>

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

                    <p>Name: {cat[index].ItemName}</p>
                    <img src={cat.ItemUrl} alt="Cat-Picture" />
                    <p>Price: {cat[index].ItemPrice}</p>

                    <div>
                      <button onClick={itemAdd(faker.name.firstName(), faker.finance.amount())}>Add to Basket</button>
                    </div>

                  </div>

                </div>
              )
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