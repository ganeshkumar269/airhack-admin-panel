import * as yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

// 127.0.0.1:9000
const registerurl = "127.0.0.1:9000"

function RegisterForm() {

    const regsiterSchema = yup.object().shape({
        email: yup.string().email()
            .required('Required'),
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
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={regsiterSchema}
                    onSubmit={async (values) => {
                        try {
                            console.log("hi")
                            const res = await axios.post(registerurl, values);
                            if (res.status === 200) {
                                alert("User creation successfull")
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
                        mail: '',
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
                                <Form.Label>Username</Form.Label>
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
                            </Form.Group>
                            <Form.Group controlId="validate1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="mail"
                                    value={values.mail}
                                    onChange={handleChange}
                                    placeholder="Mail"
                                    isValid={touched.mail && !errors.mail}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mail}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal.Dialog>
    );
}

export default RegisterForm;