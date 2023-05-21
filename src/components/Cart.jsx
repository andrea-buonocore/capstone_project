import { useEffect, useState } from "react";

import Spinner from 'react-bootstrap/Spinner';
import { Col, Container, Row } from "react-bootstrap";
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {

    const USER_URL = `http://localhost:3030/users/${localStorage.getItem('userID')}`;
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    const stripePromise = loadStripe('pk_test_51N9qvHKdxhxiyBgdi6nDFLK1CDYNDzLfNedo548tjCyXTwwmT068mHHNHtAii9ZITaN1pg82mGsvU2PkymAc4d1b006OHBZrRL');

    const handleClick = async (event) => {
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: 'price_1N9rVkKdxhxiyBgdCWHdlOgn', // Replace with the ID of your price
                quantity: 1,
            }],
            mode: 'payment',
            successUrl: `${window.location.origin}/thankyou`,
            cancelUrl: 'https://example.com/cancel',
            billingAddressCollection: 'required',

        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };

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

    const savePurchase = async () => {
        try {
            let res = await fetch(USER_URL);
            if (res.ok) {
                let user = await res.json();
                user.purchases.push(...user.cart);
                user.cart = []; // Svuota l'array "cart"
                let response = await fetch(USER_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                });

                if (response.ok) {
                    setCart([]); // Aggiorna lo stato locale dell'array "cart" a vuoto
                    return;
                }
            } else {
                return new Error(res.statusText);
            }
        } catch (e) {
            console.log(e);
        }
    };


    


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
                <div className="text-end">
                    <button role="link" onClick={() => {
                        savePurchase();
                        handleClick();

                    }} id="checkout_btn">
                        Checkout
                    </button>
                </div>

            </Container>
            <Footer />
        </>
    )
}

export default Cart;