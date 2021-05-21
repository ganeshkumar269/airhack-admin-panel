import axios from 'axios'
import constants from './constants.json'

export default axios.create({
    baseURL: constants.baseserver
})


export const adminregister = "/api/v1/admin/regsiter"