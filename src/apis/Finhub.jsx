import axios from "axios";
const TOKEN = "cgm2bshr01qlbmq7i4s0cgm2bshr01qlbmq7i4sg"
export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})

