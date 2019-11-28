import React , {Component} from "react";
import { EditorState, convertFromRaw } from "draft-js";
import createImagePlugin from 'draft-js-image-plugin';
import Editor from 'draft-js-plugins-editor';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

class Content extends Component {
  render() {
    let editorState;
    let isEditorState = false;
    try{
      const contentState = convertFromRaw(JSON.parse(this.props.content));
      editorState = EditorState.createWithContent(contentState);
      isEditorState = true;
    }
    catch(e){
      //if 'content' is not convertable to Draft.js style format, show raw content text.
      isEditorState = false;
    }

    
    return (
      <div id = 'diary-content'>
        { isEditorState ? <Editor id = 'editor' editorState={editorState} plugins={plugins} readOnly={true} onChange = {() => {}}/> : this.props.content}
      </div>
    );
  }
}

export default Content