import React from 'react';
import Content from './Content'
import { mount } from 'enzyme';

describe('<Content/>', () => {
    afterEach(() => {
        afterEach(() => { jest.clearAllMocks() });
    })

    it('should handle draftjs type content', () => {
        const stubContent = '{"blocks":[{"key":"fmij5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
        const component = mount(<Content content = {stubContent}/>)
        expect(component.find('#editor').length).toBe(2)
    })
    it('should handle non-draftjs type content', () => {
        const stubContent = 'sample_content'
        const component = mount(<Content content = {stubContent}/>)
        expect(component.find('#editor').length).toBe(0)
    })
})