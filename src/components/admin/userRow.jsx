import axios from "axios";
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { getAuthToken } from "./Auth";

const userupdateUrl = "127.0.0.1:/api/v1/user"

export default function Userrow(props) {

    const [username, setuserName] = useState(props.username)
    const [userrole, setUserrole] = useState(props.userrole)
    const [usermail, setusermail] = useState(props.usermail)


    function updateRow(type, val) {
        if (type === "username")
            setuserName(val)
        else if (type === "userrole")
            setUserrole(val)
        else
            setusermail(val)
    }

    function onSave() {
        const token = getAuthToken();
        const res = axios.post(userupdateUrl, {
            "username": username,
            "role": userrole,
            "mail": usermail
        },
            { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 200) {
            console.log('status updated')
        } else {
            alert('some error in saving data', res.status)
        }
    }


    return (
        <tr>
            <td value={username} onChange={updateRow("username")} />
            <td value={userrole} onChange={updateRow("userrole")} />
            <td value={usermail} onChange={updateRow("usermail")} />
            <Button type="edit">Edit</Button>
            <Button type="save" onClick={onSave(props.username)}>Save</Button>
        </tr>
    )


}