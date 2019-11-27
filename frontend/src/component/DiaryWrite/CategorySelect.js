import React, { Component } from 'react';
// import './honeycombb.css'
import './honeycomb.css'

import CatergoryButton from '../../component/DiaryWrite/CategoryButton';

class CategorySelect extends Component {
    state = {
        currentCategory :'',
        categoryType : 0,
        categoryName : '',
        categoryTitle : '',
        selected : false,
        rating : 0,

    }

    handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating })

    render() {
        

        const Category_type_1 = [
            //category type whose rating can be measured from 0 to 5
            'MOVIE',
            'GAME',
            'RESTAURANT',
            'BOOK',
            'DRAMA',
            'PERFOEMANCE'
        ]

        const Category_type_2 = [
            'EXERCISE',
            'FOOD',
            'TRAVEL',
            'HOBBY',
            'STUDY',
            'SPORTS',
            'SHOPPING',
        ]
        const Category_type_3 = [
            //category type which related to pesonal relationship with others
            'FRIEND',
            'FAMILY',
            'LOVE',
            'COMPANY',
            'BOSS',
            'ETC.'
        ]

       
        return (<div>
        
            <ul id="hexGrid">
                    {Category_type_1.map( (name) => { return <CatergoryButton 
                    key = {name}
                    category = {name} 
                    categoryis = {1}
                    currentButton = {this.state.currentCategory}
                    clicks = {(categoryName, type) => this.props.handleSelectCategory(categoryName , type)} /> })}

                    {Category_type_2.map( (name) => { return <CatergoryButton
                    key = {name}
                    category = {name} 
                    categoryis = {2}
                    currentButton = {this.state.currentCategory}
                    clicks = {(categoryName , type) => this.props.handleSelectCategory(categoryName , type)} /> })}

                    {Category_type_3.map( (name) => { return <CatergoryButton 
                    key = {name}
                    category = {name} 
                    categoryis = {3}
                    currentButton = {this.state.currentCategory}
                    clicks = {(categoryName , type) => this.props.handleSelectCategory(categoryName , type)} /> })}
            </ul>

        </div>)
    }
}

export default CategorySelect