import * as yup from 'yup'
import { Formik } from 'formik';
import { Form, Button, Modal, ButtonGroup } from 'react-bootstrap';
import { setAuth } from './Auth';
import { Redirect } from 'react-router-dom';
import API from '../../lib/apis'
import constants from '../../lib/constants.json'
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// TODO : create the session storage authentication here

// const adminLoginApi = "127.0.0.1/api/v1/adminlogin";

// const history = useHistory();


export default function AdminLogin() {

    const [erromess, setErrorMess] = useState("")

    const AdminLoginSchema = yup.object().shape({
        username: yup.string()
            .max(15, "Must be 15 characters or less")
            .required('Required'),
        password: yup.string()
            .min(8, 'Must be 8 charahcters or more')
            .required('Required')
    });

    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Admin Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={AdminLoginSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await API.post(constants.adminlogin, {
                                email: values.username,
                                password: values.password
                            });
                            // Need to set the session token here
                            if (res.status === 200) {
                                setAuth("adminToken", res.data.token);
                                alert("Login Successfull")
                                return <Redirect to="/admin"/>
                            }
                            else if (res.status === 404 ) {
                                const Errmessage = "User and password is not correct";
                                setErrorMess(Errmessage);
                            } else 
                            {
                                console.log("Failed the registration")
                            }
                        }
                        catch (error) {
                            console.log("Error in registration api", error)
                        }
                    }
                    }
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId="validate2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    isValid={touched.username && !errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validate3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    isValid={touched.password && !errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                                {erromess}
                            </Form.Group>
                            <ButtonGroup>
                            <Button type="submit">Submit</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                            <Button href="/adminregister">Register</Button>
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            
        </Modal.Dialog>
    );
}
