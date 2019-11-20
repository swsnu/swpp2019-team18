import React from 'react';

import { Button } from 'semantic-ui-react';

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