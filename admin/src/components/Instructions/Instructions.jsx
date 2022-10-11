import { useEffect, useRef, useState } from 'react'
import './Instructions.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import noImage from '../../assets/noImage.jpg'
import MyEditor from '../editor/MyEditor';
import { imageUploader } from '../../uploadImage';


const Instructions = ({setData,Instructions,empty2,setEmpty2}) => {
    let [instructions,setInstructions] = useState([]);
    let [file,setFile] = useState(null);
    let [title,setTitle] = useState('');
    let [description,setDescription] = useState('');
    let [edit,setEdit] = useState({index:-1,check:false});
    let [empty,setEmpty] = useState(false);
    let [editor,setEditor] = useState(false);
    let [isfetching,setFetching] = useState(false);
    let URLStr = useRef();
    const imgP = process.env.REACT_APP_SERVER_URL + 'images';

useEffect(()=>{
  setInstructions(Instructions);
},[])

   const handleChange =(e)=>{
      setTitle(e.target.value);
   }

   useEffect(()=>{
      if(empty2){
        setInstructions([]);
        setEmpty2(false);
      }
   },[empty2])
 
 const saveInStructions=()=>{
  let instruction = {image:file,title,description};
    setInstructions(prev=>{return [...prev,instruction]})
 }

 const send=(e)=>{
    e.preventDefault();
    if(!title||!description||!file){
      return;
    }
    if(edit.check){
      saveEditting(edit.index)
    }else{
      saveInStructions();
    }
    setFile(null);
    setDescription('');
    setTitle('');
    setEdit(false);
    setEmpty(true);
    URLStr.current.value = '';
 }

const saveEditting =(i)=>{
  setInstructions(prev=>{return prev.map((el,index)=>{
      return index===i ? {image:file,title,description} : el;
  })})
}
 const editInstructions = (i)=>{
  setEdit({check:true,index:i})
  setEditor(true);
  let instruction = instructions.find((el,index)=>{return index===i})
  setFile(instruction?.image);
  setTitle(instruction?.title);
  setDescription(instruction?.description);
 }

 const deleteInstruction=(i)=>{
  
  setInstructions(prev=>{return prev.filter((el,index)=>{
     return index != i
  })})

}

useEffect(()=>{
    setData(prev=>{
      return {...prev,instructions}
    })
},[instructions])


useEffect(()=>{
  if(typeof(file)!=='string'&&file!==null){
    imageUploader(file,setFile,setFetching);
  }
},[file])

  return (
    <div className='instructions'>
      <form  >
        <div className='formInput'>
            <label htmlFor='file3'>
            Image: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input 
            type={`file`}
              id='file3'
              style={{display:'none'}}
              onChange={(e)=>setFile(e.target.files[0])}/>
              <input ref={URLStr} type='text' className='imgUrl' placeholder='URL...' onChange={(e)=>setFile(e.target.value)} />
        </div>
        <img src={file?(typeof(file)==='string'?((file).startsWith('http')?file:imgP+'/'+file):URL.createObjectURL(file)):noImage} alt='' className='viewImage'/>
        <div className='formInput'>
          <input value={title} name='title' placeholder='Title' type={`text`} onChange={handleChange}/>
        </div>
        <div className='formInput' style={{flexDirection:'column'}}>
          <MyEditor editor={editor} setEditor={setEditor} description={description} empty={empty} setEmpty={setEmpty} setDescription={setDescription} />
        </div>
        <button type='submit' disabled={isfetching} onClick={send}>{edit.check?"Edit":"Send"}</button>
      </form>
      <div>
        <div className='viewInstructionContainer'>
          {instructions?.map((el,i)=>{
              return(
                <div className='viewInstructions' key={i}>
                <img src={el.image?(typeof(el.image)==='string'?((el.image).startsWith('http')?el.image:imgP+'/'+el.image):URL.createObjectURL(el.image)):noImage} alt=''/>
                <h3>{el.title}</h3>
                <p dangerouslySetInnerHTML={{__html:el.description}}></p>
                <button className='edit' onClick={()=>{editInstructions(i)}}>Edit</button>
                <button className='delete' onClick={()=>deleteInstruction(i)}>Delete</button>
              </div>
              )
          })}
  
        </div>
      </div>
    </div>
  )
}

export default Instructions
