import axios from "axios";

const scout = axios.create({
    baseURL:'http://192.168.43.191:3000'
})



export default scout