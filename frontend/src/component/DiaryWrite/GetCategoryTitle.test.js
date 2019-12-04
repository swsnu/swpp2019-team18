import React from 'react';
import GetCategoryTitle from './GetCategoryTitle';
import { mount } from 'enzyme';


const mockHandler = () => {

}

describe( 'Get Category Title', () => {
    it('should render type1', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = {'test'} selectedCategoryType = {1} />
        const component = mount(myComponent)
        const wrapper = component.find('i')
        wrapper.at(2).simulate('click')

        
    })

    it('should render type 2', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = {'test'} selectedCategoryType = {2} />
        const component = mount(myComponent)

        
    })

    it('should render type3', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = {'test'} selectedCategoryType = {3} />
        const component = mount(myComponent)
        
    })

})