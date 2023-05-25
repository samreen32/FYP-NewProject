import axios from "axios";

export default axios.create({ baseURL: "http://192.168.43.147:8000/api/auth" });
