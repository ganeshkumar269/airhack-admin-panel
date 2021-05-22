import axios from "axios";
import { Formik } from "formik";
import { getAuthToken, getWebsiteId } from "./Auth";
import { Form, Button, Card, Accordion } from 'react-bootstrap';
import { useEffect, useState } from "react";
import API from '../../lib/apis'
import constants from '../../lib/constants.json'

const questionUrl = 'https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/addqna'


export default function QaPage() {
    // This page is to give the form to create QA and display the last few QA 

    const [topics, setTopics] = useState([])

    // useEffect(
    //     () => {
    //         async function FetchQA() {
    //             const token = getAuthToken();
    //             const res = await axios.get(questionUrl, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //             if (res.status === 200)
    //                 setTopics(res.data)
    //         }
    //         FetchQA().catch((error) => {
    //             console.log("There is an error in getting QA data", error)
    //         });
    //     }, []);

    const topicElem = topics.map((singletopic, index) =>
        <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index}>
                {singletopic.Question}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
                <Card.Body>{singletopic.Answer}</Card.Body>
            </Accordion.Collapse>
        </Card>
    )



    return (
        <>
        <h1> Add QnA's for your users! </h1>
            <Formik
                initialValues={{
                    question: "",
                    answer: ""
                }}
                onSubmit={async (values) => {
                    try {
                        const token = getAuthToken("adminToken");
                        const websiteId = getWebsiteId("websiteId");

                        console.log(token, websiteId, values.question, values.answer)
                        const res = await axios.post(questionUrl, {
                            question: values.question,
                            answer: values.answer,
                            website_id:websiteId
                        },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })

                        if (res.status === 200) {
                            alert("Successfully Posted Question and Answer")
                            var newTopic = topics;
                            newTopic.push({
                                question: values.question,
                                answer: values.answer
                            });
                            setTopics(newTopic);
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
                                <Form.Label>Question</Form.Label>
                                <Form.Control type="text" name="question" onChange={handleChange}
                                    value={values.question} 
                                />
                            </Form.Group>
                            <Form.Group controlId="validate2">
                                <Form.Label>Answer</Form.Label>
                                <Form.Control type="text" name="answer" onChange={handleChange}
                                    value={values.answer} 
                                />
                            </Form.Group>
                            <Button type="submit">Post Question</Button>
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