import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import {EditorState} from 'draft-js'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import editorStyles from './editorStyles.css';
import '../../../node_modules/draft-js-static-toolbar-plugin/lib/plugin.css'
import {convertFromRaw, convertToRaw} from 'draft-js'

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

export default class SimpleStaticToolbarEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    testdebugging : ''
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(convertToRaw(this.state.editorState.getCurrentContent()))
    console.log(editorState.isInCompositionMode())
    
    this.props.handleContent(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))

  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
        
          <Editor
            editorState={this.state.editorState}
            onChange={(editorState) => this.onChange(editorState)}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
         
          <Toolbar />
        </div>
        <input value={this.state.testdebugging}
                            onChange={e => {this.setState({testdebugging : e.target.value})
                            console.log(this.state.testdebugging)} } ></input>
      </div>
    );
  }
}