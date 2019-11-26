import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import axios from 'axios'

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const url = '/api/diary/image/';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
      axios.post(url, formData,config).then(
        response => resolve(response)
      )
      .catch(
        error => reject(error)
      )
    }
  );
}

class MyEditor extends Component {
    state = {
        editorState : EditorState.createEmpty()
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
        this.props.handleContent(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
      };
    
    render () {
        return (
            <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          toolbar = {{
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false} },
          }}
        />)

    }
}

export default MyEditor