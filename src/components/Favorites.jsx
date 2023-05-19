import { Col, Container, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

const Favorites = () => {
    const USER_URL = `http://localhost:3030/users/${localStorage.getItem('userID')}`;
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFavorites = async () => {
        try {
            let res = await fetch(USER_URL);
            if (res.ok) {
                let data = await res.json();
                setFavorites(data.favorites);
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

            let response = await fetch(USER_URL);
            if (response.ok) {
                let user = await response.json();
                user.favorites = user.favorites.filter(item => item.id !== product.id);
                let res = await fetch(USER_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                });
                if (res.ok) {
                    // window.confirm(`Do you really want to remove ${product.title} from your cart?`);

                    alert(`${product.title} removed from favorites.`);
                    getFavorites();
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