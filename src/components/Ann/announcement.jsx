import axios from "axios";
import { Formik } from "formik";
import { getAuthToken, getWebsiteId } from "../admin/Auth";
import { Form, Button, Card, Accordion } from 'react-bootstrap';
import { useEffect, useState } from "react";
import API from '../../lib/apis'
import constants from '../../lib/constants.json'

const questionUrl = 'https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/announcement'
const getUrl = 'https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/announcement?website_id='

// test1@test.com
export default function Announcement() {
    // This page is to give the form to create QA and display the last few QA 

    const [announcements, setAnnouncements] = useState([])

    useEffect(
        () => {
            async function FetchQA() {
                const token = getAuthToken("adminToken");
                console.log(token)
                const res = await axios.get(getUrl+getWebsiteId("websiteId"), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res)
                if (res.status === 200)
                    setAnnouncements(res.data)
            }
            FetchQA()
        }, []);

    const topicElem = announcements.map((singletopic, index) =>
        <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index}>
                {singletopic.announcement}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
                <Card.Body>{singletopic.announcement}</Card.Body>
            </Accordion.Collapse>
        </Card>
    )



    return (
        <>
        <h1> Make an Announcement! </h1>
            <Formik
                initialValues={{
                    question: "",
                    answer: ""
                }}
                onSubmit={async (values) => {
                    try {
                        const token = getAuthToken("adminToken");
                        const websiteId = getWebsiteId("websiteId")
                        console.log(token)
                        console.log(websiteId)
                        console.log(values.answer)
                        const res = await axios.post(questionUrl, {
                            website_id: websiteId,
                            announcement: values.answer
                        },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })

                        if (res.status === 200) {
                            var newTopic = announcements;
                            newTopic.push({id:websiteId,announcement: values.answer});
                            console.log(newTopic)
                            setAnnouncements(newTopic);
                        }

                    } catch (error) {
                        console.log('Error in qa post api');
                    }
                }}
            >{
                    ({
                        handleSubmit,
                        handleChange,
                        resetForm,
                        values
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="validate1">
                                {/* <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="question" onChange={handleChange}
                                    value={values.question} 
                                /> */}
                            </Form.Group>
                            <Form.Group controlId="validate2">
                                <Form.Label>Announcement</Form.Label>
                                <Form.Control type="text" name="answer" onChange={handleChange}
                                    value={values.answer} 
                                />
                            </Form.Group>
                            <Button type="submit">Add announcement</Button>
                            <Button type="clear" onClick={resetForm}>Clear</Button>
                        </Form>
                    )
                }
            </Formik>
            <Accordion defaultActiveKey="0">
                {topicElem}
            </Accordion>
        </>
    )


}