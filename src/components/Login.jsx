import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
const Login = () => {

    const USERS_URL = 'http://localhost:3030/users';
    const navigate = useNavigate();
    const [userError, setUserError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: () => {
            checkIfUserExists(formik.values.email, formik.values.password)
        },
    });

    const checkIfUserExists = async (email, password) => {
        try {
            let res = await fetch(USERS_URL);
            if (res.ok) {
                let users = await res.json();
                let userExists = users.find(user => user.email === email.toLowerCase() && user.password === password.toLowerCase());
                if (userExists) {
                    localStorage.setItem('userID', userExists.id);
                    navigate('/home');
                } else {
                    setUserError(true);
                }
            } else {
                throw new Error(res.statusText);
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Container className='h-100'>

            <Row className='justify-content-center h-100 align-items-center flex-column'>
                {
                    userError && (
                        <Col xs={12} md={6} lg={4} className='my-3 p-0'>
                            <Alert key="danger" variant="danger">
                                User do not exist. Please try again.
                            </Alert>
                        </Col>
                    )
                }

                <Col className='form_col' xs={12} md={6} lg={4}>
                    <form onSubmit={formik.handleSubmit} autoComplete='off'>
                        <div className='my-3'>
                            <label htmlFor="email" className='d-block input_label mb-2'>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={formik.errors.email ? 'input_error' : null}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <p className='input_error_msg my-2'>{formik.errors.email}</p>
                            ) : null}
                        </div>
                        <div className='my-3'>
                            <label htmlFor="password" className='d-block input_label mb-2'>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={formik.errors.password ? 'input_error' : null}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <p className='input_error_msg my-2'>{formik.errors.password}</p>
                            ) : null}
                        </div>

                        <button type="submit" id='submit' className='my-3'>LOGIN</button>
                    </form>
                    <div id='create_account' className='my-3'>
                        <span>Don't you have any account?</span> <br></br>
                        <button type="button" className='my-3' onClick={() => { navigate('/signup') }}>SIGN UP</button>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default Login;