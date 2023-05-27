import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {

    const [countdown, setCountdown] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer);
            // Reindirizza alla homepage
            navigate('/home');
        }

        return () => {
            clearInterval(timer);
        };
    }, [countdown]);

    return (
        <Container id='ty_container' className='h-100 d-flex flex-column align-items-center justify-content-center'>
                <h2 className='my-3'>Thank You for Your Purchase!</h2>
                <p className='my-3'>Your order has been successfully placed.</p>
                <p className='my-3'>
                    You'll be redirected to the home page in {countdown} second{countdown !== 1 && 's'}.
                </p>
        </Container>
    );
};

export default ThankYouPage;
