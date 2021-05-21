import axios from "axios";
import { Formik } from "formik"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap'

const urlApi = "192.168.0.1:9000/api/v1/domain"

export default function Parsing() {

    const [returnUrls, setReturnUrls] = useState("");

    var linkElem = ""
    if (returnUrls !== "") {
        linkElem = returnUrls.map((item) => 
            <li>{item}</li>
        )
    }

    return (
        <>
        <Formik
            onSubmit={async (values) => {
                try {
                    const res = await axios.put(urlApi, values)
                    if (res.status === 200) {
                        setReturnUrls(res.data);
                    }
                } catch (error) {
                    console.log("Error in calling api", error);
                }
            }}
            initialValues={{
                callUrl: ""
            }}
        >
            {
                ({
                    handleSubmit,
                    handleChange,
                    values
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="validate1">
                            <Form.Label>Enter your domain Name</Form.Label>
                            <Form.Control type="text" name="domainname"
                                value={values.domainname}
                            />
                        </Form.Group>
                        <Button type="submit">Generate Domain links</Button>
                    </Form>
                )
            }
        </Formik>
        {linkElem}
        </>
    )
}