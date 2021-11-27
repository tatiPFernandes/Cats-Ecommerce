import { React, useState } from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {

  const [modal, setModal] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const itemAdd = () => {
    basketItems.push({ ItemName: "Test", ItemPrice: 600 })
    setBasketItems(basketItems);
    setTotalPrice(totalPrice += basketItems[0].ItemPrice);
    console.log(totalPrice);
    console.log(basketItems);
  }
  // byeee ^^ Cya :XD Haha wait. Shall i save this? You can do
  return (
    <div>
      <button onClick={openModal}>Basket</button>
      <button onClick={itemAdd}>Add Item</button>
      <Modal isOpen={modal}>
        <button onClick={closeModal}>Close</button>
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
          <p>{totalPrice}</p>
        </div>
      </Modal>
    </div>
  )

}

export default App;

{/* <div className="row">
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
              <button>Add to Basket</button>
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

</div> */}
