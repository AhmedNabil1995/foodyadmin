import './New.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoImage from '../../assets/noImage.jpg';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from 'react';
import {userInputs,usertitle,mealInputs,mealtitle} from '../../formResources';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/reducers/usersReducer';
import { addMeal } from '../../redux/reducers/mealsReducer';
import Ingredients from '../../components/ingredients/Ingredients';
import Instructions from '../../components/Instructions/Instructions';
import { imageUploader } from '../../uploadImage';

const New = (props) => {
    
    let [file,setFile] = useState(null);
    let loc = useLocation();
    let [inputs,setInputs] = useState([]);
    let [title,setTitle] = useState(null);
    let [data,setData] = useState({});
    let dispatch = useDispatch();
    let {admin} = useSelector(state=>state.auth);
    let [empty,setEmpty] = useState(false);
    let [empty2,setEmpty2] = useState(false);
    let URLStr = useRef();
    let [isfetching,setFetching] = useState(false);

    useEffect(()=>{
        switch(loc.pathname){
            case '/addUser':
                    setInputs(userInputs);
                    setTitle(usertitle);
                    break;
            case '/addMeal':
                setInputs(mealInputs);
                setTitle(mealtitle);
        }
    },[loc])

    const handleChangle = (e)=>{
        setData({...data,[e.target.name]:e.target.value});

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        data.image = file;

        if(loc.pathname==="/addUser"){
            dispatch(addUser(data));  
        }else if(loc.pathname==="/addMeal"){
            dispatch(addMeal({admin,meal:data}));   
        }

        setFile(null);
        setData({})
        setEmpty(true);
        setEmpty2(true);
        URLStr.current.value = '';
    }

    useEffect(()=>{
        if(typeof(file)!=='string'&&file!==null){
          imageUploader(file,setFile,setFetching);
        }
      },[file])

  return (
    <div className='new'>
        <Sidebar />
        <div className='newContainer'>
            <Navbar />
            <div className='top'>
                <h1>{title}</h1>
            </div>
            <div className='bottom'>
                <div className='left'>
                    <img src={file?(typeof(file)==='string'?file:URL.createObjectURL(file)):NoImage} alt=''/>
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit} >
                    <div className='formInput'>
                        <label htmlFor='file'>
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input ref={URLStr} type='text' className='imgUrl' placeholder=' Image URL...' onChange={(e)=>setFile(e.target.value)} />
                        <input 
                        type={`file`}
                         id='file'
                         style={{display:'none'}}
                         onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    {inputs?.map((input,i)=>{
                        return(
                            <div className='formInput' key={input?.id}>
                            <label>{input?.label}</label>
                            <input required={true} minLength={input.type==='passwoed'?4:3} value={data[input.name]||''} name={input?.name} onChange={handleChangle} type={input?.type} placeholder={input?.placeholder} />
                            </div>
                        )
                    })}
                    <button type='submit' disabled={isfetching}>Send</button>
                    </form>
                </div>
            </div>
           {loc.pathname==='/addMeal' && <div style={{display:loc.pathname==='/addMeal'?'block':'none'}}>
            <hr style={{margin:'20px 0',border:'1px solid #ddd',height:'0'}}/>
            <Ingredients setFetching={setFetching} Ingredients={[]} status={'add'} setData={setData} empty={empty} setEmpty={setEmpty}/>
            <hr style={{margin:'20px 0',border:'1px solid #ddd',height:'0'}}/>
            <Instructions Instructions={[]} status='add' setData={setData} empty2={empty2} setEmpty2={setEmpty2}/>
            </div>}
        </div>
    </div>
  )
}

export default New