import React from 'react';

import {Dropdown, Grid, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';

const CategoryButton = (props) => {
    return (
    <Button basic id='diary-category-button' 
            type="button"
            key = {props.category}
            active={props.currentButton === props.category} 
            style={{ marginBottom:'1em' }}
            onClick={() => props.clicks(props.category, props.categoryis)}>
            {props.category}
    </Button>)
    
}

export default CategoryButton;