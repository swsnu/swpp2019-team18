import React from 'react';

import {Dropdown, Grid, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';

const Categories = [
    'movie', 
    'game', 
    'restaurant', 
    'book', 
    'travel', 
    'drama', 
    'performance', 
    'relationship', 
    'rest', 
    'exercise', 
    'shopping', 
    'study', 
    'food' , 
    'work', 
    'sports', 
    'hobby', 
    'etc.'
]

const CategoryButton = (props) => {
    <Button id='diary-category-travel-button' 
            color={props.currentButton === props.category ? 'red' : 'blue'} 
            active={props.currentButton === props.category} 
            style={{ marginBottom:'1em' }}
            onClick={e => props.clicks}>
            {props.category}
    </Button>
}

export default CategoryButton;