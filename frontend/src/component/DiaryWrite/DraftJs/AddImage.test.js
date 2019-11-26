import React from 'react';
import AddImage from './AddImage'
import createImagePlugin from 'draft-js-image-plugin';
import { mount} from 'enzyme';
import axios from 'axios'


const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const mockOnChange = (editorState) => {
}
const mockModifier = (editorState) => {
}

describe('<AddImage/>', () => {
    afterEach(() => {
        afterEach(() => { jest.clearAllMocks() });
    })

    it('should render', () => {
        const component = mount(
            <div>
            <span id = 'mock-click-page'></span>
            <AddImage editorState={''}
            onChange={mockOnChange}
            modifier={mockModifier}/>
            </div>)

        const button = component.find('#add-image')
        button.simulate('mouseup')
        expect(component.find('.addImagePopover').length).toBe(1)
        const anywhereinPage = component.find('#add-image')
        anywhereinPage.at(0).simulate('click')


    })

    it('should past url', () => {
        const component = mount(
            <AddImage editorState={''}
            onChange={mockOnChange}
            modifier={mockModifier}/>)

        const button = component.find('#add-image')
        button.simulate('mouseup')
        const linkInput = component.find('#url-input')
        linkInput.simulate('change', {target : {value : 'sample.image.com'}})
        expect(component.state('url')).toBe("sample.image.com");
        const addButton = component.find('#add-button')
        addButton.simulate('click')

        
    })

    it('should handle file upload', () => {
        const component = mount(<AddImage editorState={''}
            onChange={mockOnChange}
            modifier={mockModifier}/>)

        const spy = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status : 200 , data : {link : 'swpp.com/image'}
                    };
                    resolve(result);
                })
            }
        )

        const fileContents       = 'file contents';
        const expectedFinalState = {fileContents: fileContents};
        const file               = new Blob([fileContents], {type : 'image'});
        const readAsText         = jest.fn();
        const addEventListener   = jest.fn((_, evtHandler) => { evtHandler(); });
        const dummyFileReader    = {addEventListener, readAsText, result: fileContents};
        window.FileReader        = jest.fn(() => dummyFileReader);
        component.find('#upload-file-input').simulate('change', {target: {files: [file]}});


        
    })


    

})