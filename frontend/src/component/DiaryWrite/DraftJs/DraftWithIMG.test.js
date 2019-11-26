import React from 'react';

import DraftEditor from './DraftWithIMG'
import { mount} from 'enzyme';
const handleContent = (content) => {

}

describe('<DraftEditor/>', ()=> {
    it('should render without error', () => {
        const component = mount(<DraftEditor handleContent = {(content) => handleContent(content)} />)
        const wrapper = component.find('.RichEditor-styleButton')
        wrapper.at(0).simulate('click')

    })

    it('run on editmode', () => {
        const component = mount(<DraftEditor handleContent = {(content) => handleContent(content)} EditMode = {true} content = {'sample'}/>)
        const wrapper = component.find('.RichEditor-styleButton')
        wrapper.at(0).simulate('click')
        const ed = component.find('.public-DraftEditor-content');
    
        ed.simulate('keyDown', {
            keyCode: 9,
            metaKey: false, // is IS_OSX=true, this should be true
            ctrlKey: false,
            altKey: false,
            });
    })

    it('keydown simulate ', () => {
        const component = mount(<DraftEditor handleContent = {(content) => handleContent(content)} EditMode = {true} content = {'sample'}/>)
        const wrapper = component.find('.RichEditor-styleButton')
        wrapper.at(12).simulate('click')
        const ed = component.find('.public-DraftEditor-content');
    
        ed.simulate('keyDown', {
            keyCode: 76,
            metaKey: false, // is IS_OSX=true, this should be true
            ctrlKey: false,
            altKey: false,
            });
    })

    it('add image clicking simulate ', () => {
        const component = mount(<DraftEditor handleContent = {(content) => handleContent(content)} EditMode = {true} content = {'sample'}/>)
        const wrapper = component.find('#add-image')
        wrapper.simulate('click')
    })
})
