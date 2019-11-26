import React, { Component } from 'react';
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
        const Message = 'What do you want to write about?'

       
        return (<div>
        
            <ul id="hexGrid">
                    {Category_type_1.map( (name) => { return <CatergoryButton 
                    category = {name} 
                    categoryis = {1}
                    currentButton = {this.state.currentCategory}
                    clicks = {(name, type) => this.props.handleSelectCategory(name , type)} /> })}

                    {Category_type_2.map( (name) => { return <CatergoryButton 
                    category = {name} 
                    categoryis = {2}
                    currentButton = {this.state.currentCategory}
                    clicks = {(name, type) => this.props.handleSelectCategory(name, type)} /> })}

                    {Category_type_3.map( (name) => { return <CatergoryButton 
                    category = {name} 
                    categoryis = {3}
                    currentButton = {this.state.currentCategory}
                    clicks = {(name, type) => this.props.handleSelectCategory(name, type)} /> })}
            </ul>

        </div>)
    }
}

export default CategorySelect