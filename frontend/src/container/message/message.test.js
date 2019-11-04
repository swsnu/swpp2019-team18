import React from 'react';
import MessagePopup from './message';
import { mount, shallow } from 'enzyme';

describe('<message/>', ()=> {
    it('should render ', (done) => {
        const component = mount(<MessagePopup onClose={() => {}}/>);
        setTimeout(() => {
            done();
        }, 3000);
    })
});