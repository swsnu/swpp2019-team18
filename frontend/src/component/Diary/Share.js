import React, { Component } from 'react';
import { EditorState, CompositeDecorator, SelectionState, Modifier, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start, end;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    callback(start, end);
  }
};

const SearchHighlight = (props) => (
  <span className="search-and-replace-highlight">{props.children}</span>
);

const generateDecorator = (highlightTerm) => {
  const regex = new RegExp(highlightTerm, 'g');
  return new CompositeDecorator([{
    strategy: (contentBlock, callback) => {
      if (highlightTerm !== '') {
        findWithRegex(regex, contentBlock, callback);
      }
    },
    component: SearchHighlight,
  }])
};

class Share extends Component {
  constructor(props) {
    super(props);
    this.focus = () => this.editor.focus();

    this.state = {
      search: '',
      replace: '',
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content))),
    }
  }

  forceSelection = () => {
    const { editorState } = this.state;
    return EditorState.forceSelection(
      editorState,
      editorState.getSelection(),
    );
  }

  onChangeSearch = (e) => {
    const search = e.target.value;
    this.setState({
      search,
      editorState: EditorState.set(this.state.editorState, { decorator: generateDecorator(search) }),
    });
    
  }

  onChangeReplace = (e) => {
    this.setState({
      replace: e.target.value,
    });
  }

  onReplace = () => {
    this.focus()
    const { editorState, search, replace } = this.state;
    const regex = new RegExp(search, 'g');
    const selectionsToReplace = [];
    let contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    blockMap.forEach((contentBlock) => (
      findWithRegex(regex, contentBlock, (start, end) => {
        const blockKey = contentBlock.getKey();
        const blockSelection = SelectionState
          .createEmpty(blockKey)
          .merge({
            anchorOffset: start,
            focusOffset: end,
          });

        selectionsToReplace.push(blockSelection)
      })
    ));
    
    selectionsToReplace.forEach(selectionState => {
      contentState = Modifier.replaceText(
        contentState,
        selectionState,
        replace,
      )
    });

    this.setState({
      editorState: EditorState.push(
        editorState,
        contentState,
      )
    })
    
    this.props.handleContent(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
    
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.handleContent(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
  }

  

  render() {
    return (
      <div>
        <Editor
          ref={elem => { this.editor = elem; }}
          editorState={this.state.editorState}
          onChange={this.onChange}
          stripPastedStyles={true}
          plugins={plugins}
        />
        <div className="search-and-replace">
          <input
            value={this.state.search}
            onChange={this.onChangeSearch}
            placeholder="Search..."
          />
          <input
            value={this.state.replace}
            onChange={this.onChangeReplace}
            placeholder="Replace..."
          />
          <button onClick={this.onReplace}>
            Replace
          </button>
        </div>
      </div>
    );
  }
}

export default Share;