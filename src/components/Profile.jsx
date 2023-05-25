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
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="my-3">account: {user.email}</span>
                                <button onClick={() => {
                                    localStorage.removeItem('userID');
                                    navigate('/');

                                }}>LOGOUT</button>
                            </div>
                            <br />

                            <span className="my-3">Your Purchases:</span>
                            {
                                user.purchases.map((purchase, index) => {
                                    return (
                                        <Row key={index} xs={1} className="my-4 align-items-center">
                                            <Col className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span>Purchased: {purchase.date}</span>
                                                    <br />
                                                    <span>$ {purchase.totalPrice}</span>
                                                </div>
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