import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const Footer = () => {
    return (
        <footer className="py-5">
            <Container>
                <span className='d-block mb-3 fw-bold fs-2'>F.A.Q. <br></br>(Frequently Asked Question)</span>
                <Accordion className='my-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is your return policy?</Accordion.Header>
                        <Accordion.Body>
                            We offer a 30-day return policy for all items in their original condition with tags attached. Please visit our Returns page for more information.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion className='my-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What payment methods do you accept?</Accordion.Header>
                        <Accordion.Body>
                            We accept all major credit cards, PayPal, and Apple Pay.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion className='my-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How long will it take for my order to arrive?</Accordion.Header>
                        <Accordion.Body>
                            Orders are typically processed within 1-2 business days and shipped via standard shipping, which takes 3-5 business days for delivery within the continental US. International shipping times may vary depending on the destination.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion className='my-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I track my order?</Accordion.Header>
                        <Accordion.Body>
                            Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can use this number to track your order on our website or on the carrier's website.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion className='my-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Can I cancel or modify my order?</Accordion.Header>
                        <Accordion.Body>
                            We are not able to cancel or modify orders once they have been placed. However, if you need to make a change to your order, please contact us as soon as possible and we will do our best to accommodate your request.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <span className='d-block text-center mt-3 fw-light'>&copy; Andrea Buonocore {new Date().getFullYear()}</span>
            </Container >
        </footer >
    )
}

export default Footer;