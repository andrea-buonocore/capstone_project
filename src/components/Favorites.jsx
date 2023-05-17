import { Col, Container, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import { FAVORITES_URL } from './ProductDetails';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

const Favorites = () => {

    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFavorites = async () => {
        try {
            let res = await fetch(FAVORITES_URL);
            if (res.ok) {
                let data = await res.json();
                setFavorites(data);
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
                return new Error(res.statusText);
            };
        }
        catch (err) { console.log(err); setIsLoading(false); }
    }

    const removeFromFavorites = async (product) => {
        try {
            let res = await fetch(FAVORITES_URL + product.id, {
                method: "DELETE"
            });
            if (res.ok) {
                alert(`${product.title} removed from cart.`);
                getFavorites();
                setIsLoading(false);
            }
            else return new Error(res.statusText)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getFavorites() }, []);
    return (
        <>
            <Header />
            <Container id="favorites_container" className="px-3">
                <h3 className="my-5">Favorites</h3>
                {
                    favorites.length == 0 && (
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
                    favorites && (
                        favorites.map((product, index) => {
                            return (
                                <Row key={index} xs={1} className="my-3 align-items-center">
                                    <Col xs={3} lg={1}>
                                        <Link to={`/product/${product.id}`}>
                                            <img src={product.image} alt={product.title} className="img-fluid" />
                                        </Link>
                                    </Col>
                                    <Col xs={7} lg={10}>
                                        <span className="d-block my-3">{product.title}</span>
                                        <span className="d-block fw-light fs-5 my-3">$ {product.price}</span>
                                    </Col>
                                    <Col xs={2} lg={1} className="d-flex align-items-center justify-content-center">
                                        <span className="material-symbols-outlined" onClick={() => {
                                            removeFromFavorites(product);
                                        }}>
                                            close
                                        </span>
                                    </Col>

                                </Row>

                            )
                        })
                    )
                }
            </Container>
            <Footer />

        </>
    )
}

export default Favorites;