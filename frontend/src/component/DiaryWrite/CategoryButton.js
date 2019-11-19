import React from 'react';

import {Dropdown, Grid, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';

const CategoryButton = (props) => {
    return (
    <Button basic id='diary-category-travel-button' 
            type="button"
            active={props.currentButton === props.category} 
            color={props.currentButton === props.category ? 'red' : 'blue'} 
            style={{ marginBottom:'1em' }}
            onClick={() => props.clicks(props.category, props.categoryis)}>
            {props.category}
    </Button>)
    
}

export default CategoryButton;