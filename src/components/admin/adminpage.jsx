// Lets check if the authentication is done
// if not then reroute the admin login page

import { getAuth } from "./Auth";
import { Redirect } from 'react-router-dom'
import Parsing from "./parsing";
import { Container, Col, Row } from "react-bootstrap";
import UserManagement from "./usermanagement";
import QaPage from "./qa";
import Analytics from './analytics'

export default function AdminPage() {
    if (!getAuth("adminToken"))
        return <Redirect to="/adminlogin" />
    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Parsing />
                    </Row>
                    <Row>
                        {/* <UserManagement /> */}
                    </Row>
                </Col>
                <Col>
                        <QaPage />
                        <Analytics/>
                </Col>
            </Row>
        </Container>
    );
}