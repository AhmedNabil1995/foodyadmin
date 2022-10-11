import {storage} from '../src/firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const imageUploader = async(imageFile,setData,setFetching)=>{
    
    if(!imageFile|| imageFile==='string') return

    setFetching(true);
    
    let picName = Date.now() + imageFile?.name;
    const storageRef = ref(storage, picName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

uploadTask.on('state_changed', 
(snapshot) => {
const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log('Upload is ' + progress + '% done');
switch (snapshot.state) {
  case 'paused':
    console.log('Upload is paused');
    break;
  case 'running':
    console.log('Upload is running');
    break;
}
}, 
(err) => {
console.log(err)
setFetching(false);
setData(null);
}, 
() => {
 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    setData(downloadURL);
    setFetching(false);
});
}
);
}
