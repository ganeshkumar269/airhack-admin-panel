import { Navbar, Nav } from 'react-bootstrap';
import Loginform from './login';
import { Route, Switch } from 'react-router-dom'
import RegisterForm from './userRegister';
import AdminPage from './admin/adminpage';
import AdminLogin from './admin/adminLogin';
import AdminRegister from './admin/adminRegistration';


export default function Header() {
    return (
        <>
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar.Brand href="/">AIRBUSUI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="#Home">QA</Nav.Link>
                <Nav.Link href="#improvements">Improvements</Nav.Link>
                <Nav.Item><Loginform /></Nav.Item>
                <Nav.Link href="/register">Register</Nav.Link>
            </Navbar>

            <Switch>
                <Route path="/register"><RegisterForm /></Route>
                <Route path="/admin"><AdminPage /></Route>
                <Route path="/adminlogin"><AdminLogin /> </Route>
                <Route path="/adminregister"><AdminRegister /></Route>
            </Switch>
        </>
    );
}