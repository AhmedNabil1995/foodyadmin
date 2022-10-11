import React, {  useEffect, useRef, useState } from 'react'
import './Ingredients.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import NoImage from '../../assets/noImage.jpg';
import { imageUploader } from '../../uploadImage';



const Ingredients = ({Ingredients,ingredientsImage,setFetching,setData,empty,setEmpty}) => {
    let [file,setFile] = useState(null);
    let [ingredients,setIngredients] =useState([]);
    const cols = ['Quantity','Ingredient','Action'];
    const imgP = process.env.REACT_APP_SERVER_URL + 'images';

    let Quantity = useRef();
    let Name = useRef();

    
    useEffect(()=>{
        setIngredients(Ingredients);
        setFile(ingredientsImage);
    },[])

    useEffect(()=>{
        if(empty){
          setIngredients([]);
          setFile(null);
          setEmpty(false)
        }
     },[empty])
  
    const addIngredient =(e)=>{
        e.preventDefault();
        if(Name.current.value!==''&&Quantity.current.value!==''){
            let newIngredient = {quantity:Quantity.current.value,name:Name.current.value};

            setIngredients([...ingredients,newIngredient])
            Name.current.value = '';
            Quantity.current.value = '';
        }
    }

    const handleImage =(e)=>{
        setFile(e.target.value);
    }

    useEffect(()=>{
            setData(prev=>{
                return {...prev,ingredients:{image:file,_ingredients:ingredients}}
            })
     
    
    },[ingredients,file])

    useEffect(()=>{
        if(typeof(file)!=='string'&&file!==null){
            imageUploader(file,setFile,setFetching);
        }
    },[file])

    const deleteIngredient= (i)=>{
        setIngredients(prev=>{
            return (
                prev.filter((el,index)=>{
                    return index !=i;
                })
            )
        })
    }

  return (
    <div className='ingredients'>
        <div className='imgContainer'>
            <label htmlFor='file2'>
            Image : <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input type={`file`} id='file2' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
            <input type='text' placeholder='URL...' onChange={handleImage}/>
            <img src={file?(typeof(file)==='string'?(file.startsWith('http')?file:imgP+'/'+file):URL.createObjectURL(file)):NoImage} alt=''/>
        </div>
        <div>
        <form>
            <input ref={Quantity} type='text' className='quantityInput' />
            <input ref={Name} type='text' className='nameInput' />
            <button onClick={addIngredient}>Add</button>
        </form>
       <table>
        <thead>
            <tr>
            {cols.map((col,i)=>{
                return (
                        <th key={i}>{col}</th>
                        )
                    })}
            </tr>
        </thead>
        <tbody>
            {ingredients?.map((item,i)=>{
                return(
                    <tr key={i}>
                        <td>{item?.quantity}</td>
                        <td>{item?.name}</td>
                        <td className='tdDelete'><button onClick={()=>{deleteIngredient(i)}} className='delete'>delete</button></td>
                    </tr>
                )
            })}
        </tbody>
       </table>
        </div>
    </div>
    
  )
}

export default Ingredients