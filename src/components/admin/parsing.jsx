import { Formik } from "formik"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import API from '../../lib/apis'
import constants from '../../lib/constants.json'
import { getAuthToken } from "./Auth";


export default function Parsing() {

    const [returnUrls, setReturnUrls] = useState("");

    // var linkElem = ""
    // if (returnUrls !== "") {
    //     linkElem = returnUrls.map((item) => 
    //         <li>{item}</li>
    //     )
    // }

    return (
        <>
        <Formik
            onSubmit={async (values) => {
                try {
                    const token = getAuthToken('admin');
                    const res = await API.get(constants.admingetkeywords, {
                        params: {
                            website_id: values.callurl,
                        },
                        headers: {
                            Authorization: `Bearer: ${token}`
                        }
                    })
                    if (res.status === 200) {
                        setReturnUrls(res.data);
                    }
                } catch (error) {
                    console.log("Error in calling api", error);
                }
            }}
            initialValues={{
                callurl: ""
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
                            <Form.Control type="text" name="callurl"
                                value={values.callurl} onChange={handleChange}
                            />
                        </Form.Group>
                        <Button type="submit">Generate Domain links</Button>
                    </Form>
                )
            }
        </Formik>
        {returnUrls}
        </>
    )
}