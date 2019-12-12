import React , {Component} from "react";
import { EditorState, convertFromRaw } from "draft-js";
import createImagePlugin from 'draft-js-image-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import Editor , {composeDecorators}from 'draft-js-plugins-editor';
import './Content.css'

const resizeablePlugin = createResizeablePlugin();
const decorator = composeDecorators(
  resizeablePlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });
const plugins = [
  imagePlugin,
  resizeablePlugin];

const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

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
      <div className = 'RichEditor-content-root' id = 'diary-content'>
        
        <div className = 'RichEditor-content-editor' id = 'diary-content'>
        { isEditorState ?
         <Editor id = 'editor' editorState={editorState} 
                  blockStyleFn={getBlockStyle}
                  plugins={plugins}
                  readOnly={true} 
                  onChange = {() => {}}
                  customStyleMap={styleMap}
                  /> : this.props.content}
          </div>
      </div>
    );
  }
}

export default Content