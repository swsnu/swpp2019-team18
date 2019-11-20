import React from 'react';
import Header from './Header'
import {  mount , shallow} from 'enzyme';



describe('Header', () => {
    it('should render correctly', () => {
        const component = shallow(<Header/>)
        const wrapper = component.find('#header')
        expect(wrapper.length).toBe(1)

    })
})