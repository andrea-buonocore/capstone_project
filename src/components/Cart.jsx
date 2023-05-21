import { useEffect, useState } from "react";

import Spinner from 'react-bootstrap/Spinner';
import { Col, Container, Row } from "react-bootstrap";
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  
    const USER_URL = `http://localhost:3030/users/${localStorage.getItem('userID')}`;
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getCartProducts = async () => {
        try {
            let res = await fetch(USER_URL);
            if (res.ok) {
                let data = await res.json();
                setCart(data.cart);
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
                return new Error(res.statusText);
            };
        }
        catch (err) { console.log(err); setIsLoading(!isLoading); }
    }

    const removeFromCart = async (product) => {
        try {

            let response = await fetch(USER_URL);
            if (response.ok) {
                let user = await response.json();
                user.cart = user.cart.filter(item => item.id !== product.id);
                let res = await fetch(USER_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                });
                if (res.ok) {
                    // window.confirm(`Do you really want to remove ${product.title} from your cart?`);

                    alert(`${product.title} removed from cart.`);
                    getCartProducts();
                    setIsLoading(false);

                }
                else return new Error(res.statusText);
            }
            else return new Error(response.statusText);

        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => { getCartProducts() }, []);

    let total = cart?.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0);

    return (
        <>
            <Header />
            <Container id="cart_container" className="px-3">

                <h3 className="my-5">Cart</h3>

                {
                    cart.length === 0 && (
                        <span className="d-block text-center my-5">You have not added any item yet</span>
                    )
                }

                {
                    isLoading && (
                        <div className="text-center my-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }

                {
                    cart && (
                        cart.map((product, index) => {
                            return (
                                <Row key={index} xs={1} className="my-3 align-items-center">
                                    <Col xs={3} md={2} lg={1}>
                                        <Link to={`/product/${product.id}`}>
                                            <img src={product.image} alt={product.title} className="img-fluid" />
                                        </Link>
                                    </Col>
                                    <Col xs={7} md={8} lg={10} className="px-md-4">
                                        <span className="d-block my-3">{product.title}</span>
                                        <span className="d-block my-3">Quantity: {product.quantity}</span>
                                        <span className="d-block fw-light my-3">$ {product.price * product.quantity}</span>
                                    </Col>
                                    <Col xs={2} md={2} lg={1} className="d-flex align-items-center justify-content-end">
                                        <span className="material-symbols-outlined" onClick={() => {
                                            removeFromCart(product);
                                        }}>
                                            close
                                        </span>
                                    </Col>
                                </Row>

                            )
                        })
                    )
                }
                <span className="my-5 d-block text-end">
                    {cart?.length > 0 ? `Total: $ ${total}` : null}
                </span>
                <button>Checkout</button>

            </Container>
            <Footer />
        </>
    )
}

export default Cart;