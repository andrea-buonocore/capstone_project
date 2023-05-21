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
                                user.purchases.map((purchase, index) => {
                                    return (
                                        <Row key={index} xs={1} className="my-3 align-items-center">
                                            <Col>
                                                <span>Date: {purchase.date}</span>
                                                <span>$ </span>
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