import './update.scss'

import NoImage from '../../assets/noImage.jpg';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducers/usersReducer';
import { imageUploader } from '../../uploadImage';


const Update = (props) => {
    let [file,setFile] = useState(null);
    let [data,setData] = useState({});
    let dispatch = useDispatch();
    let imgP = process.env.REACT_APP_SERVER_URL + '/images';
    let {admin} = useSelector(state=>state.auth);
    let [isfetching,setFetching] = useState(false);
    let [address,setAddress] = useState(null);

    const handleChangle = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleAddressChange = (e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if(address){
            setData({...data,address});
        }
    },[address])

    const handleSubmit=(e)=>{
        e.preventDefault();
        let id = props.item._id;
        data.image = file;
        dispatch(updateUser({admin,id,user:data}));
        props?.setIsupdate(false);
    }

    useEffect(()=>{
        if(typeof(file)!=='string'&&file!==null){
          imageUploader(file,setFile,setFetching);
        }
      },[file])

      useEffect(()=>{
        setFile(props.item.image)
        setAddress(props?.item?.address);
      },[])

  return (
    <div className='update'>
            <div className='updateContainer'>
            <button className='close' onClick={()=>props?.setIsupdate(false)}>X</button>
                <div className='left'>
                    <img src={file?(typeof(file)==='string'?((file).startsWith('http')?file:imgP+'/'+file):URL.createObjectURL(file)):NoImage} alt=''/>
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit} >
                    <div className='formInput'>
                        <label htmlFor='file'>
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input 
                        type={`file`}
                         id='file'
                         style={{display:'none'}}
                         onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                            <div className='formInput'>
                            <label>First Name</label>
                            <input required={true} defaultValue={props?.item['firstName']} name='firstName' onChange={handleChangle} />
                            </div>
                            <div className='formInput'>
                            <label>Last Name</label>
                            <input required={true} defaultValue={props?.item['lastName']} name='lastName' onChange={handleChangle} />
                            </div>
                            <div className='formInput'>
                            <label>Email</label>
                            <input required={true} type='email' defaultValue={props?.item['email']} name='email' pattern='[a-z]+([.]?[a-z]+)?@[a-z]+[.][a-z]+' onChange={handleChangle} />
                            </div>
                            <div className='formInput'>
                            <label>password</label>
                            <input  name='password' onChange={handleChangle} />
                            </div>
                            <div className='formInput'>
                            <label>Phone</label>
                            <input defaultValue={props?.item['phone']||''} name='phone' onChange={handleChangle} />
                            </div>
                            <div className='formInput'>
                            <label>apartment Number</label>
                            <input defaultValue={props?.item['address']?.['apartmentNumber']||''} name='apartmentNumber' onChange={handleAddressChange}/>
                            </div>
                            <div className='formInput'>
                            <label>floor Number</label>
                            <input defaultValue={props?.item['address']?.['floorNumber']||''} name='floorNumber' onChange={handleAddressChange}/>
                            </div>
                            <div className='formInput'>
                            <label>Building Number</label>
                            <input defaultValue={props?.item['address']?.['BuildingNumber']||''} name='BuildingNumber' onChange={handleAddressChange}/>
                            </div>
                            <div className='formInput'>
                            <label>street</label>
                            <input defaultValue={props?.item['address']?.['street']||''} name='street' onChange={handleAddressChange}/>
                            </div>
                            <div className='formInput'>
                            <label>area</label>
                            <input defaultValue={props?.item['address']?.['area']||''} name='area' onChange={handleAddressChange}/>
                            </div>
                            <div className='formInput'>
                            <label>city</label>
                            <input defaultValue={props?.item['address']?.['city']||''} name='city' onChange={handleAddressChange}/>
                            </div>
                    <button type='submit' disabled={isfetching}>Update</button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Update