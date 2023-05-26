import { Container, Row, Col } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
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
            <Container id="profile_container" className="px-3">
                {
                    user && (
                        <>
                            <div className="my-3 d-flex justify-content-between align-items-center">
                                <span>{user.email}</span>
                                <button onClick={() => {
                                    localStorage.removeItem('userID');
                                    navigate('/');

                                }}>LOGOUT</button>
                            </div>
                            <h3 className="my-5 ">Recent Purchases</h3>

                            {
                                user.purchases.map((purchase, index) => {
                                    return (
                                        <Row className="my-3" key={index}>
                                            <Col>
                                                <span className="d-block">Purchased on: {purchase.date}</span>
                                                <span className="d-block">Price: $ {purchase.totalPrice}</span>

                                                <Row xs={3} md={6} className="my-3">
                                                    {
                                                        purchase.items.map((item, index) => {
                                                            return (
                                                                <Col className="text-center">
                                                                    <Link to={`/product/${item.id}`}>
                                                                        <img src={item.image} alt={item.title} className="purchase_item" />
                                                                    </Link>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>

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