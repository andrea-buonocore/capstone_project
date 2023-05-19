import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const USERS_URL = 'http://localhost:3030/users';
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            confirm_password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: () => {
            checkPassword(formik.values.password, formik.values.confirm_password)
        },
    });

    const createUser = async (email, password) => {
        try {
            let res = await fetch(USERS_URL);
            if (res.ok) {
                let users = await res.json();
                let newID = users[users.length - 1].id + 1;
                let newUser = {
                    id: newID,
                    email: email,
                    password: password,
                    cart: [],
                    favorites: [],
                }
                let response = await fetch(USERS_URL, {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                if (response.ok) {
                    alert('User created successfully. You will now be redirected to the login page.');
                    navigate('/');
                }
                else {
                    return new Error(response.statusText);
                }
            }
            else {
                return new Error(res.statusText);
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    const checkIfUserExists = async (email, password) => {
        console.log(email, password);
        try {
            let res = await fetch(USERS_URL);
            if (res.ok) {
                let users = await res.json();
                let userExists = users.find(user => user.email === email.toLowerCase());
                if (userExists) {
                    alert(`User ${userExists.email} already exists. Please choose a different user.`);
                    formik.resetForm();
                } else {
                    createUser(email, password);
                }
            } else {
                throw new Error(res.statusText);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const checkPassword = (password, confirm_password) => {
        if (password === confirm_password) {
            checkIfUserExists(formik.values.email, formik.values.password);
        }
        else {
            alert('Passwords do not match. Please make sure your passwords match.');
            formik.resetForm();
        }
    }






    return (
        <Container className='h-100'>
            <Row className='justify-content-center h-100 align-items-center px-5'>
                <Col xs={12} md={4} className='form_col'>
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
                        <div className='my-3'>
                            <label htmlFor="confirm_password" className='d-block input_label mb-2'>Confirm Password</label>
                            <input
                                name="confirm_password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm_password}
                                className={formik.errors.confirm_password ? 'input_error' : null}
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <p className='input_error_msg my-2'>{formik.errors.confirm_password}</p>
                            ) : null}
                        </div>

                        <button type="submit" id='submit' className='my-3'>SIGN UP</button>
                    </form>
                    <div id='login'>
                        <span>Already have an account? Log in here.</span> <br></br>
                        <button type="button" className='my-3' onClick={() => { navigate('/') }}>LOGIN</button>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;