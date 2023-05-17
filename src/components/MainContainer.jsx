import { Col, Container, Row } from "react-bootstrap"
import Hero from "./Hero";
import { Link } from "react-router-dom";
import Footer from './Footer';
const MainContainer = () => {
    return (
        <>
            <Hero />
            <Container className="py-5">
                <Row xs={1} md={3}>
                    <Link to={'/category/women\'s clothing'}>
                        <Col className="py-5 col_category d-flex align-items-center justify-content-center">
                            <span className="fw-light">WOMEN</span>
                        </Col>
                    </Link>
                    <Link to={'/category/men\'s clothing'}>
                        <Col className="py-5 col_category d-flex align-items-center justify-content-center">
                            <span className="fw-light">MEN</span>
                        </Col>
                    </Link>
                    <Link to={'/category/jewelery'}>
                        <Col className="py-5 col_category d-flex align-items-center justify-content-center">
                            <span className="fw-light">JEWELRY</span>
                        </Col>
                    </Link>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default MainContainer;