
import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateToHTML} from 'draft-js-export-html'
import axios from 'axios';

const TextEditor = () => {
  const [description, setDescription] = useState( EditorState.createEmpty());

  const convertDescriptionFromJSONToHTML = () => {
    try{
      return { __html: stateToHTML(description.getCurrentContent())}
      // return {__html: 'First &middot; Second'};
    } catch(exp) {
      console.log(exp)
      return { __html: 'Error' }
    }
}

const uploadCallback = (file) => {    
  const formData = new FormData();
  formData.append('file', file);  
  axios.post('/uploadImage', formData)
  .then((res)=>{
    console.log(res.data);
  })      
}
//   return new Promise((resolve, reject) => {
//     fetch('/uploadImage', {
//       method: 'POST',
//       body: formData
//     })
//     .then(res => res.json())
//     .then( resData => {
//       console.log(resData)    
//       resolve({ data: { link: resData } });
//     })
//     .catch(error => {
//         console.log(error)
//         reject(error.toString())
//     })    
//   }) 
//   // console.log('image',file);
// }

const onSubmit = (e) => {
  e.preventDefault()
  
  const newPost = {
    description: convertToRaw(description.getCurrentContent())
  }
  console.log("POST: ",newPost)
  axios.post('/data', newPost)
  .then((res)=>{
    console.log(res.data);
  })
  // fetch('/data', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newPost)
  // })
  // .then(res => res.json())
  // .then(data => {
  //     console.log(data)
  //     setDescription(EditorState.createEmpty())
  //     // history.goBack()
  // })
  // .catch(err => console.log("ERROR:",err))
}

  return(
      <div>
         <form onSubmit={onSubmit}>
         {/* <form> */}
          <Editor
                    editorState={description}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    wrapperStyle={{ border: "2px solid green", marginBottom: "20px" }}
                    editorStyle={{ height: "300px", padding: "10px"}}
                    toolbar={{ image: { uploadCallback }}}
                    onEditorStateChange={editorState => setDescription(editorState)}
                />
                <br/>
                 <button type="submit" className="btn btn-lg btn-primary btn-block">
                          Add Post
                </button>
                 <div dangerouslySetInnerHTML={convertDescriptionFromJSONToHTML()}></div>
                 </form>
      </div>
  );
  
}

export default TextEditor;
