import { Form, Modal, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const posturl = "https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/login";


function ModalForm(props) {

    const loginSchema = yup.object().shape({
        username: yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        password: yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('Required')
    })



    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async values => {
            try {
                // console.log("running")
                const res = await axios.post(posturl, JSON.stringify(values))
                if (res.status === 200){
                    console.log("logged in")
                    console.log(res)
                }
                else {
                    alert("Wrong authentication")
                }
            } catch (error) {
                console.log("Error in submitting form", error);
            }
        },
    });



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="validateFormik01">
                        <Form.Control type="username" placeholder="Username" name="username"
                            onChange={formik.handleChange} value={formik.values.username}
                            isValid={formik.touched.username && !formik.errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validateFormik02">
                        <Form.Control type="password" placeholder="Password" name="password"
                            onChange={formik.handleChange} value={formik.values.password}
                            isValid={formik.touched.password && !formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

function Loginform() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Login
            </Button>
            <ModalForm show={showModal} onHide={() => setShowModal(false)} />
        </>
    )
}

export default Loginform;