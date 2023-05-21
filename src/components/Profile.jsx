import { Container, Row, Col } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Profile = () => {

    const [user, setUser] = useState(null);

    const USER_URL = `http://localhost:3030/users/${localStorage.getItem('userID')}`;

    const getProfileInfo = async () => {
        try {
            let res = await fetch(USER_URL);
            if (res.ok) {
                let user = await res.json();
                setUser(user);
            }
            else {
                return new Error(res.statusText);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfileInfo();
    }, [])

    return (
        <>
            <Header />
            <Container id="profile_container">
                {
                    user && (
                        <>
                            <div className="text-end">
                                <span className="my-3">{user.email}</span>
                                <button className="mx-3">Logout</button>
                            </div>
                            <span className="my-3">Your Purchases:</span>

                            {
                                user.purchases.map((product, index) => {
                                    return (
                                        <Row key={index} xs={1} className="my-3 align-items-center">
                                            <Col xs={2} md={2} lg={1}>
                                                <Link to={`/product/${product.id}`}>
                                                    <img src={product.image} alt={product.title} className="img-fluid" />
                                                </Link>
                                            </Col>
                                            <Col xs={10} md={10} lg={11} className="px-md-4">
                                                <span className="d-block my-3">{product.title}</span>
                                                <span className="d-block my-3">Quantity: {product.quantity}</span>
                                                <span className="d-block fw-light my-3">$ {product.price * product.quantity}</span>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }

                        </>
                    )
                }
            </Container>
        </>
    )
}

export default Profile;