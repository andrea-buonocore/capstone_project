import { Col, Container, Row } from "react-bootstrap"
import Hero from "./Hero";
import { Link } from "react-router-dom";

const MainContainer = () => {
    return (
        <>
            <Hero />
            <Container className="py-3">
                <Row xs={1} md={3}>
                    <Link to={'/category/women'}>
                        <Col className="py-5 col_category d-flex align-items-center justify-content-center">
                            <span className="fw-light">WOMEN</span>
                        </Col>
                    </Link>
                    <Link to={'/category/men'}>
                        <Col className="py-5 col_category d-flex align-items-center justify-content-center">
                            <span className="fw-light">MEN</span>
                        </Col>
                    </Link>
                    <Link to={'/category/accessories'}>
                        <Col className="py-5 col_category d-flex align-items-center justify-content-center">
                            <span className="fw-light">ACCESSORIES</span>
                        </Col>
                    </Link>
                </Row>
            </Container>
        </>
    )
}

export default MainContainer;