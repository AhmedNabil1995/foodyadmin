import axios from "axios";
let url = process.env.REACT_APP_SERVER_URL;
export const uploadImage = async(image)=>{
    let res = await axios.post(`${url}upload/images`,image);
    console.log(res.data);
}