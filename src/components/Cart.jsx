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
                setIsLoading(!isLoading);
            }
            else {
                setIsLoading(!isLoading);
                return new Error(res.statusText);
            };
        }
        catch (err) { console.log(err); setIsLoading(!isLoading); }


    }

    useEffect(() => { getCartProducts() }, [])

    return (
        <Container id="cart_container">
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
                                <Col xs={2} lg={1}>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </Col>
                            </Row>

                        )
                    })
                )
            }

        </Container>
    )
}

export default Cart;