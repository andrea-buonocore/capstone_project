import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap"

const Login = () => {
    
    useEffect(() => {
        
            const FORM = document.getElementById('form');
        
            FORM.addEventListener('click', (e) => {
                e.preventDefault();
                alert('AJO!');
            })

    },[])

    return (
        <Container id="login_page">
            <Row>
                <Col>
                    <form id="form">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="email here..."/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password here..." />
                        <input type="submit"/>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;