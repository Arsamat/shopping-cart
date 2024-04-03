import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function CardList({ cart, updateCart }) {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [query, setQuery] = useState("");

    const fetchProducts = async () => {
        const res = await axios.get(
            'https://dummyjson.com/products'
        );
        const data = res.data;
        setProducts(data.products)
        setFiltered(data.products)
    };

    const filter = (e) => {
        const val = e.target.value.toLowerCase()
        setQuery(e.target.value)

        const arr = products.filter((product) => {
            const titleMatch = product.title.toLowerCase().includes(val);
            const categoryMatch = product.category.toLowerCase().includes(val);
            return titleMatch || categoryMatch;
        });
        setFiltered(arr)
    }

    useEffect(() => {
        fetchProducts();

    }, [])

    return (
        <div>
            <link
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                crossorigin="anonymous"
            />
            <div style={{marginBottom: "20px", marginTop: "20px", marginLeft: "auto", marginRight: "auto", width: "800px"}}>
            <input style={{width: "100%"}}type="text" placeholder='Search by name or category...' value={query} onChange={(e) => filter(e)} />
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>

                {filtered.map(product => (
                    <div key={product.id} style={{ width: '25%', marginBottom: '20px' }}>
                        <Card>
                            <Card.Img variant="top" src={product.images[0]} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>Name: {product.title}</Card.Title>
                                <Card.Title>Category: {product.category}</Card.Title>
                                {
                                    cart.some(item => item.product.id === product.id) ? (
                                        <h4>Added</h4>
                                    ) : (
                                        <Button variant="success" onClick={() => updateCart(product)}>Add to cart</Button>
                                    )
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardList;
