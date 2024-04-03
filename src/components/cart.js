import { Button } from "react-bootstrap";

function Cart({ cart, updateQuantity, removeItem }) {
    return (
        <div>
            <link
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                crossorigin="anonymous"
            />
            <h2>Shopping Cart</h2>
            {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <img src={item.product.images[0]} alt={item.product.title} style={{ width: '300px', height: '250px', marginRight: '20px' }} />
                    <div>
                        <h3>{item.product.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <div style={{ marginTop: '10px' }}> {/* Added a wrapper div with margin top */}
                            <Button variant="danger" onClick={(e) => removeItem(item)}>Remove product</Button>
                            <span style={{ margin: '0 5px' }}></span> {/* Added a span for spacing */}
                            <Button onClick={(e) => updateQuantity(item, 1)}>Increase Quantity</Button>
                            <span style={{ margin: '0 5px' }}></span> {/* Added a span for spacing */}
                            <Button onClick={(e) => updateQuantity(item, -1)}>Decrease Quantity</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cart;


