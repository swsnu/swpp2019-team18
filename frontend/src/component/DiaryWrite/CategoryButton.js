import React from 'react';
import './honeycomb.css'

const CategoryButton = (props) => {
    return (
        <li className="hex">
                    <div className="hexIn">
                    <button className="hexLink"
                    id = {'diary-category-button-'+String(props.categoryis)}
                    type="button"
                    style={{ marginBottom:'1em' }}
                    onClick={() => props.clicks(props.category, props.categoryis)}>
                        {props.category}
                    </button>
            </div>
        </li>
    /*
    <Button basic id='diary-category-button' 
            type="button"
            key = {props.category}
            active={props.currentButton === props.category} 
            style={{ marginBottom:'1em' }}
            onClick={() => props.clicks(props.category, props.categoryis)}>
            {props.category}
    </Button>*/
    )
    
}

export default CategoryButton;