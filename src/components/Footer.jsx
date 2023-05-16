import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-5">
            <Container>
                <span className='d-block text-center mb-5 fw-light fs-1'>F.A.Q.</span>
                <Accordion className='my-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is your return policy?</Accordion.Header>
                        <Accordion.Body>
                            We offer a 30-day return policy for all items in their original condition with tags attached. Please visit our Returns page for more information.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>What payment methods do you accept?</Accordion.Header>
                        <Accordion.Body>
                            We accept all major credit cards, PayPal, and Apple Pay.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How long will it take for my order to arrive?</Accordion.Header>
                        <Accordion.Body>
                            Orders are typically processed within 1-2 business days and shipped via standard shipping, which takes 3-5 business days for delivery within the continental US. International shipping times may vary depending on the destination.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How do I track my order?</Accordion.Header>
                        <Accordion.Body>
                            Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can use this number to track your order on our website or on the carrier's website.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Can I cancel or modify my order?</Accordion.Header>
                        <Accordion.Body>
                            We are not able to cancel or modify orders once they have been placed. However, if you need to make a change to your order, please contact us as soon as possible and we will do our best to accommodate your request.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <a href="https://www.linkedin.com/in/andreabuonocore00/" target='_blank'>
                    <span className='d-block text-center mt-5 fw-light'>&copy; Andrea Buonocore {new Date().getFullYear()}</span>
                </a>
            </Container >
        </footer >
    )
}

export default Footer;