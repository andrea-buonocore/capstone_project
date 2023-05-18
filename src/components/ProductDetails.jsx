import { useEffect, useState } from "react";
import { Button, Col, Container, Row, ToastContainer } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';
import Header from './Header';
import Footer from './Footer';


const ProductDetails = () => {

    const USER_URL = `http://localhost:3030/users/${localStorage.getItem('userID')}`;
    console.log("USER_URL", USER_URL);

    const PRODUCT_URL = 'https://fakestoreapi.com/products/';

    const params = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);

    const getProductDetail = async () => {
        try {
            let res = await fetch(PRODUCT_URL + params.id);
            if (res.ok) {
                let data = await res.json();
                setProduct(data);
                setIsLoading(false);
            }
            else {
                return new Error(res.statusText);
            };
        }
        catch (err) { console.log(err); setIsLoading(false); }


    }

    const addToCart = async (product) => {
        try {

            let response = await fetch(USER_URL);

            if (response.ok) {

                let user = await response.json();

                user.cart.push(product);

                let res = await fetch(USER_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                })
                if (res.ok) {
                    return;
                }
                else return new Error(res.statusText);
            }

            else return new Error(response.statusText);

        }
        catch (err) {
            console.log(err);
        }
    }

    const addToFavorites = async (product) => {
        try {
            let response = await fetch(USER_URL);
            if (response.ok) {
                let user = await response.json();
                user.favorites.push(product);
                let res = await fetch(USER_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                })
                if (res.ok) {
                    return;
                }
                else return new Error(res.statusText);
            }

            else return new Error(response.statusText);

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductDetail();
    }, [])

    return (
        <>
            <Header />
            <Container className="details_container">
                <Breadcrumb>
                    <LinkContainer to='/home'>
                        <Breadcrumb.Item>home</Breadcrumb.Item>
                    </LinkContainer>

                    <LinkContainer to={`/category/${product?.category}`}>
                        <Breadcrumb.Item>
                            {product?.category}
                        </Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>
                        {product?.title}
                    </Breadcrumb.Item>
                </Breadcrumb>
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
                    product && (
                        <Row>
                            <Col xs={12} md={6} lg={4} className="d-flex align-items-center justify-content-center">
                                <img src={product.image} alt={product.title} className="object-fit-contain product_img" />
                            </Col>
                            <Col xs={12} md={6} lg={8} className="p-3">
                                <div className="d-flex align-items center my-3">
                                    <span>
                                        {product.rating.rate}/5
                                    </span>
                                </div>
                                <span className="d-block fw-bold fs-5">{product.title}</span>
                                <span className="d-block my-3">{product.description}</span>
                                <span className="d-block fw-light fs-5 my-3">$ {product.price}</span>
                                <div className="text-end">
                                    <button className="my-3 mx-2 btn_atf" onClick={() => {
                                        addToFavorites(product);
                                        toggleShowB();
                                    }}>
                                        Add To Favorites
                                    </button>
                                    <button className="my-3 btn_atc" onClick={() => {
                                        addToCart(product);
                                        toggleShowA();
                                    }}>Add To Cart</button>
                                </div>
                            </Col>
                            <ToastContainer position="bottom-start" className="p-3 position-fixed">
                                <Toast show={showA} onClose={toggleShowA} delay={3000} autohide>
                                    <Toast.Header>
                                        <span className="me-auto">added to cart!</span>
                                        <small>now</small>
                                    </Toast.Header>
                                    <Toast.Body>{product.title}</Toast.Body>
                                </Toast>
                            </ToastContainer>
                            <ToastContainer position="bottom-start" className="p-3 position-fixed">
                                <Toast show={showB} onClose={toggleShowB} delay={3000} autohide>
                                    <Toast.Header>
                                        <span className="me-auto">added to favorites!</span>
                                        <small>now</small>
                                    </Toast.Header>
                                    <Toast.Body>{product.title}</Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </Row>
                    )
                }
            </Container>
            <Footer />
        </>
    )
}

export default ProductDetails;