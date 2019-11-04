import React from 'react';
import MessagePopup from './MessagePopup';
import { mount } from 'enzyme';

describe('<message/>', ()=> {
    it('should render ', (done) => {
        mount(<MessagePopup onClose={() => {}}/>);
        setTimeout(() => {
            done();
        }, 3000);
    })
});