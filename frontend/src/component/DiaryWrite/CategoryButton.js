import React from 'react';
import './honeycombb.css'
const CategoryButton = (props) => {

    return (
        // <li className="hex">
        //             <div className="hexIn">
        //             <button className="hexLink"
        //             id = {'diary-category-button-'+String(props.categoryis)}
        //             type="button"
        //             style={{ marginBottom:'1em' }}
        //             onClick={() => props.clicks(props.category, props.categoryis)}>
        //                 {props.category}
        //             </button>
        //     </div>
        // </li>
    /*
    <Button basic id='diary-category-button' 
            type="button"
            key = {props.category}
            active={props.currentButton === props.category} 
            style={{ marginBottom:'1em' }}
            onClick={() => props.clicks(props.category, props.categoryis)}>
            {props.category}
    </Button>*/
    <li className="hex">
        <div className="hexIn">
          <a id = {props.categoryType === 1 ?  'diary-category-button-1' :
                   props.categoryType === 2 ? 'diary-category-button-2' :
                   props.categoryType === 3 ? 'diary-category-button-3' : null} 
                   className="hexLink" href="#" onClick={() => props.clicks(props.category, props.categoryType)}>
              {props.category === 'MOVIE' ? <img src = '/icon/movie.png'></img> : 
              props.category === 'GAME' ? <img src = '/icon/game.png'></img> : 
              props.category ==  'RESTAURANT' ? <img src = '/icon/restaurant.png'></img> : 
              props.category === 'BOOK' ? <img src = '/icon/book.png'></img> :
              props.category === 'DRAMA' ? <img src = '/icon/drama.jpg'></img> : 
              props.category === 'PERFORMANCE' ? <img src = '/icon/performance.jpg'></img> :
              props.category === 'EXERCISE' ? <img src = '/icon/exercise.jpg'></img> : 
              props.category === 'FOOD' ? <img src = '/icon/food.jpg'></img> : 
              props.category ==='TRAVEL' ? <img src = '/icon/travel.jpg'></img> : 
              props.category === 'HOBBY' ? <img src = '/icon/hobby.jpg'></img> :
              props.category === 'SPORT' ? <img src = '/icon/sport.png'></img> :
              props.category === 'SHOPPING' ?  <img src = '/icon/shopping.jpg'></img> :
              props.category === 'FRIEND' ?  <img src = '/icon/friend.jpg'></img> :
              props.category === 'COMPANY' ?  <img src = '/icon/company.jpg'></img> :
              props.category === 'LOVE' ? <img src = '/icon/love.png'></img> : 
              props.category === 'STUDY' ? <img src = '/icon/study.png'></img> : 
              props.category === 'FAMILY' ? <img src = '/icon/family.jpg'></img> : <img src = '/icon/etc.png'></img>}
             {/* <div className='img'  src = '/movie.jpeg'></div> */}
            <h1 id="demo1">{props.category}</h1>
          </a>
        </div>
      </li>


    )
    
}

export default CategoryButton;