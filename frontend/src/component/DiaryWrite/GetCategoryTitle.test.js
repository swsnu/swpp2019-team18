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
        const wrapper = component.find('#category-type-three')
        expect(wrapper.length).toBe(2);

    })

    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'EXERCISE' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })
    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'FOOD' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })
    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'TRAVEL' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })
    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'HOBBY' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })
    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'STUDY' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })
    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'SPORT' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })
    it('should show different question', () => {
        const myComponent = <GetCategoryTitle handleTitle= {() => mockHandler()} categoryName = 'SHOPPING' selectedCategoryType = {2} />
        const component = mount(myComponent)
    })


})