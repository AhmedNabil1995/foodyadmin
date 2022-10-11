import axios from "axios"
let url = process.env.REACT_APP_SERVER_URL;

export const getUser=async(admin,id,setUser)=>{
        let res = await axios.get(`${url}users/${id}`,{
        headers:{token:admin.token}
        })
        setUser(res.data);
}

  
export const getMeal =async(admin,id,setData)=>{
    let res = await axios.get(`${url}meals/${id}`,{
       headers:{token:admin.token}
     })
     setData(res.data);
}