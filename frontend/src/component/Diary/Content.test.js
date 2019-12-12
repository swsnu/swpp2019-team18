import React from 'react';
import Content from './Content'
import { mount } from 'enzyme';

describe('<Content/>', () => {
    afterEach(() => {
        afterEach(() => { jest.clearAllMocks() });
    })

    it('should handle draftjs type content', () => {
        const stubContent = '{"blocks":[{"key":"759jb","text":"This is just for test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bkpra","text":"This is just for test","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7416c","text":"This is just for test","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
        const component = mount(<Content content = {stubContent}/>)
        expect(component.find('#editor').length).toBe(2)
    })
    it('should handle non-draftjs type content', () => {
        const stubContent = 'sample_content'
        const component = mount(<Content content = {stubContent}/>)
        expect(component.find('#editor').length).toBe(0)
    })
})