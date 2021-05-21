import { Redirect } from "react-router-dom";
import API from '../../lib/apis'
import constants from '../../lib/constants.json'
import * as yup from 'yup'
import {Modal, Form, Button} from 'react-bootstrap'
import {Formik} from 'formik'



export default function AdminRegister() {
    const regsiterSchema = yup.object().shape({
        email: yup.string().email()
            .required('Required'),
        password: yup.string()
            .min(8, 'Must be 8 charahcters or more')
            .required('Required')
    });

    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={regsiterSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await API.post(constants.adminregister, values);
                            if (res.status === 200) {
                                alert("User creation successfull")
                                // push to the login page
                                return <Redirect to="/adminlogin" />
                            } else {
                                console.log("Failed the registration")
                            }
                        }
                        catch (error) {
                            console.log("Error in registration api", error)
                        }
                    }
                    }
                    initialValues={{
                        email: '',
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
                            <Form.Group controlId="validate1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Mail"
                                    isValid={touched.mail && !errors.mail}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mail}
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
                            </Form.Group>
                            <Button type="submit">Register</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal.Dialog>
    );
}
