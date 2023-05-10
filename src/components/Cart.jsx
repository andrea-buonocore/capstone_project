import { useEffect, useState } from "react";
import { CART_URL } from './ProductDetails';
import Spinner from 'react-bootstrap/Spinner';
import { Col, Container, Row } from "react-bootstrap";

const Cart = () => {

    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCartProducts = async () => {
        try {
            let res = await fetch(CART_URL);
            if (res.ok) {
                let data = await res.json();
                setCart(data);
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
            let res = await fetch(CART_URL + product.id, {
                method: "DELETE"
            });
            if (res.ok) {
                alert(`${product.title} removed from cart.`);
                getCartProducts();
                setIsLoading(false);
            }
            else return new Error(res.statusText)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getCartProducts() }, []);

    const total = cart?.reduce((accumulator, current) => accumulator + current.price, 0);

    return (
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
                                <Col xs={3} lg={1}>
                                    <img src={product.image} alt={product.title} className="img-fluid" />
                                </Col>
                                <Col xs={7} lg={10}>
                                    <span className="d-block my-3">{product.title}</span>
                                    <span className="d-block fw-light fs-5 my-3">$ {product.price}</span>
                                </Col>
                                <Col xs={2} lg={1} className="d-flex align-items-center justify-content-end">
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
        </Container>
    )
}

export default Cart;