import CardList from './components/cardlist';
import Cart from './components/cart';
import {useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import './App.css';

function App() {
  const [cart, changeCart] = useState([]);
  const [change_comp, setChange] = useState(false);

  const updateCart = async (product) => {
    const arr = [...cart, { product: product, quantity: 1 }] 
    changeCart([...cart, { product: product, quantity: 1 }])
    const res = await axios.get('https://dummyjson.com/carts/user/1')
    const cart_id = res.data.carts[0].id;
    const values = arr.map((item) => ({id: item.product.id, quantity: item.quantity}))

    fetch('https://dummyjson.com/carts/' + cart_id, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merge: false, // this will include existing products in the cart
        products: values
      })
    })
      .then(res => res.json())
      .then(console.log);
  }

  const updateQuantity = async (item, val) => {
    if (item.quantity + val < 0) {
      return
    }
    item.quantity = item.quantity + val
    const arr = cart.map(value =>
      value.product.id === item.product.id ? item : value
    )
    changeCart(arr)

    //make api call to update our cart
    const res = await axios.get('https://dummyjson.com/carts/user/1')
    const cart_id = res.data.carts[0].id;
    const values = cart.map((item) => ({id: item.product.id, quantity: item.quantity}))
    fetch('https://dummyjson.com/carts/' + cart_id, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merge: false, // this will include existing products in the cart
        products: values
      })
    })
      .then(res => res.json())
      .then(console.log);

  }

  const removeItem = async (item) => {
    const arr = cart.filter((value) => value.product.id !== item.product.id)
    changeCart(arr)
    //make api call to update our cart
    const res = await axios.get('https://dummyjson.com/carts/user/1')
    const cart_id = res.data.carts[0].id;
    const values = arr.map((item) => ({id: item.product.id, quantity: item.quantity}))
    fetch('https://dummyjson.com/carts/' + cart_id, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merge: false, // this will include existing products in the cart
        products: values
      })
    })
      .then(res => res.json())
      .then(console.log);

  }
  return(
    <div>
      {
        change_comp ? <div>
          <Button onClick={() => setChange(false)}>View Products</Button> 
          <Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem}/>
          </div>
        : <div>
          <Button onClick={() => setChange(true)}>View Cart</Button>
          <CardList cart={cart} updateCart={updateCart}/>
          </div>
      }
    </div>
  )
}

export default App;
