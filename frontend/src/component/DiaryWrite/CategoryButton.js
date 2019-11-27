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
    // <li className="hex">
    //     <div className="hexIn">
    //       <a className="hexLink" href="#" onClick={() => props.clicks(props.category, props.categoryis)}>
    //         <div className='img'  style = {{backgroundImage : 'url(&{require(image)})'}}></div>
    //         <h1 id="demo1">{props.category}</h1>
    //       </a>
    //     </div>
    //   </li>


    )
    
}

export default CategoryButton;