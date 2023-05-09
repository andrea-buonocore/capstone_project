import { useEffect, useState } from "react";
import { Button, Col, Container, Row, ToastContainer } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

const ProductDetails = () => {

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
                setIsLoading(!isLoading);
            }
            else {
                return new Error(res.statusText);
            };
        }
        catch (err) { console.log(err); setIsLoading(!isLoading); }


    }

    useEffect(() => {
        getProductDetail();
    }, [])

    return (
        <Container className="details_container">
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
                            <img src={product.image} alt={product.title} height={300} className="object-fit-contain product_img" />
                        </Col>
                        <Col xs={12} md={6} lg={8} className="p-3">
                            <span className="d-block my-3">[star] {product.rating.rate}/5</span>
                            <span className="d-block fw-bold fs-5">{product.title}</span>
                            <span className="d-block my-3">{product.description}</span>
                            <span className="d-block fw-light">$ {product.price}</span>
                            <div className="text-end">
                                <button className="my-3 mx-2 btn_atf" onClick={toggleShowB}>
                                    [heart]
                                </button>
                                <button className="my-3 btn_atc" onClick={toggleShowA}>Add To Cart</button>
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
    )
}

export default ProductDetails;