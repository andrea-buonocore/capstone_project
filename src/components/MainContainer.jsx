import { Col, Container, Row } from "react-bootstrap"
import Hero from "./Hero";

const MainContainer = () => {
    return (
        <>
            <Hero />
            <Container>
                <Row className="justify-content-between">
                    <Col xs={12} md={4} className="py-5 col_category d-flex align-items-center justify-content-center">
                        <span className="fw-light">WOMEN</span>
                    </Col>
                    <Col xs={12} md={4} className="py-5 col_category d-flex align-items-center justify-content-center">
                        <span className="fw-light">MEN</span>
                    </Col>
                    <Col xs={12} md={4} className="py-5 col_category d-flex align-items-center justify-content-center">
                        <span className="fw-light">ACCESSORIES</span>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainContainer;