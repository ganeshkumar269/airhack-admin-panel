// This is a component to manage the users in admin page

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { getAuthToken } from "./Auth";
import Userrow from "./userRow";

const userLogin = "127.0.0.1:9000/api/v1/user"


export default function UserManagement() {

    // const [userid, setUserid] = useState(0);
    const [userdata, setUserData] = useState([])


    useEffect(() => {
        // Fetch all the user with name and role
        async function fetchUsers() {
            const token = getAuthToken('admin');
            const resp = await axios.get(userLogin, {
                Authorization: `Bearer: ${token}`
            })
            if (resp.status === 200) {
                setUserData(resp.data)
            } else if (resp.status === 404) {
                console.log("No data related to user in system")
            }
        }

        fetchUsers().catch((err) => {
            console.log("Error in user request", err.message)
        });

    })


    const userElem = userdata.map((data, index) =>
        <li key={index}>
            <Userrow username={data.username} userrole={data.role} usermail={data.mail} />
        </li>
    )

    return (
        <>
            <h1>User Management</h1>
            <Table>
                <tr>
                    <th>User Name</th>
                    <th>Role</th>
                    <th>mail</th>
                </tr>
                {userElem}
            </Table>
        </>
    )
}