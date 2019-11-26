import React, { Component } from 'react';
import {Button, Icon, Container} from 'semantic-ui-react'
import styles from './buttonStyles.css';
import axios from 'axios'

export default class ImageAdd extends Component {
  // Start the popover closed
  state = {
    url: '',
    open: false,
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  }

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }
    this.preventNextClose = false;
  };

  handleImageUpload = (e) => {
    const url = '/api/diary/image/';
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    const config = {
          headers: {
                'content-type': 'multipart/form-data'
            }
      }
        
    return  axios.post(url, formData,config).then(
          response => {this.setState({url : response.data.link})}
        ).catch(
          error => {}
        )
  }

  addImage = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, this.state.url));
  };

  changeUrl = (evt) => {
    this.setState({ url: evt.target.value });
  }

  render() {
    const popoverClassName = this.state.open ?
      'addImagePopover' :
      'addImageClosedPopover';
    const buttonClassName = this.state.open ?
      'addImagePressedButton' :
      'addImageButton';

    console.log(styles.addImagePopover)

    return (
      <span className='RichEditor-styleButton' >
        <label 
                  id = 'add-image'
          onMouseUp={this.openPopover}>
            <Icon name = 'file image'/>
          </label>
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
        >
          <input type = 'file' id = 'upload-file-input' accept = 'image/*' onChange={e => this.handleImageUpload(e)}/>
          <input
            type="text"
            id = "url-input"
            placeholder="Paste the image url …"
            onChange={this.changeUrl}
            value={this.state.url}
          />
          
          <button
            type="button"
            id = 'add-button'
            onClick={this.addImage}
          >
            Add
          </button>
        </div>
      </span>
    );
  }
}