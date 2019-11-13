import React, { Component } from 'react';
import { Grid, Button, Form, Container, Segment, Dropdown, Header , Rating, Label} from 'semantic-ui-react';

import CatergoryButton from '../../component/DiaryWrite/CategoryButton';
import { withRouter } from 'react-router';

class CategorySelect extends Component {
    state = {
        currentCategory :'',
        categoryType : 0,
        categoryName : '',
        categoryTitle : '',
        selected : false,
        rating : 0,

    }

    handleToggle = (name, type) => {
        this.setState({currentCategory : name, categoryName : name, selected : true, categoryType : type});
        console.log(this.state.currentCategory);
        /*
        let updateButtons = this.state.buttons.slice();
        updateButtons[btnId] = !updateButtons[btnId]
        if(updateButtons[btnId]){
            updateButtons = updateButtons.map(val => false);
            updateButtons[btnId] = true;
        }
        this.setState({buttons : updateButtons, categoryName: name});
        */
    }

    onClickPrev = () => {
        if(this.state.selected){
            this.setState({currentCategory : '', categoryName : '', selected : false, categoryType : 0});
        }
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
            '🎬MOVIE',
            '🎮GAME',
            '🍽RESTAURANT',
            '📚BOOK',
            '📺DRAMA',
            '💃PERFOEMANCE'
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

        let component = null;
        if(!this.state.selected){
            component = 
            <div>
            <Header as = 'h1' >What do you want to write about?</Header>
            <Header as = 'h2'> ...maybe you want to rate something....</Header>
                <Button.Group id = 'category_type1'>
                    {Category_type_1.map( (name) => { return <CatergoryButton 
                    category = {name} 
                    currentButton = {this.state.currentCategory}
                    clicks = {() => this.handleToggle(name ,1)} /> })}
                </Button.Group>
            <Header as = 'h2'> or you want to wrtie about your daily life..</Header>
                <Button.Group id = 'category_type1'>
                    {Category_type_2.map( (name) => { return <CatergoryButton 
                    category = {name} 
                    currentButton = {this.state.currentCategory}
                    clicks = {() => this.handleToggle(name, 2)} /> })}
            </Button.Group>
            <Header as = 'h2'>or about relationship </Header>
                <Button.Group id = 'category_type1'>
                    {Category_type_3.map( (name) => { return <CatergoryButton 
                    category = {name} 
                    currentButton = {this.state.currentCategory}
                    clicks = {() => this.handleToggle(name, 3)} /> })}
            </Button.Group>
            </div>
        }
        else {
            if(this.state.categoryType === 1){
                component = <div>
                    <Label as='a' color='blue' image>
                    {this.state.categoryName}
                </Label>
                <Header>What is the title/name of the {this.state.categoryName} ?</Header>
                    <Form.Input 
                        fluid
                        placeholder='Star Wars'
                        id='diary-category-title-input'
                        value={this.state.categoryTitle}
                        onChange={e => this.setState({categoryTitle : e.target.value})}
                        />
                <Header>How was that {this.state.categoryName} ?</Header>
                    <Rating icon='star' defaultRating={3} maxRating={5} onRate={this.handleRate} />
                    
                </div>
            }
            else if (this.state.categoryType === 2){
                component = <div>
                    <Label as='a' color='blue' image>
                    {this.state.categoryName}
                </Label>
                <Header>If You want, tell me brief information about things you did...</Header>
                    <Form.Input 
                        fluid
                        placeholder='Star Wars'
                        id='diary-category-title-input'
                        value={this.state.categoryTitle}
                        onChange={e => this.setState({categoryTitle : e.target.value})}
                        />
                </div>
            }
            else if (this.state.categoryType === 3){
                component = <div>
                    <Label as='a' color='blue' image>
                    {this.state.categoryName}
                </Label>
                <Header>If You want, tell me brief information about things you did...</Header>
                    <Form.Input 
                        fluid
                        placeholder='Star Wars'
                        id='diary-category-title-input'
                        value={this.state.categoryTitle}
                        onChange={e => this.setState({categoryTitle : e.target.value})}
                        />
                </div>
            }
        }
        return (<div>
            <div> 
                <Button className = {!this.state.selected ? 'ui disabled button' : 'ui active button'} style = {{floated : 'left'}} 
                 onClick = {() => this.onClickPrev()}>
                    Prev
                </Button>
                <Button className = {!this.state.selected ? 'ui disabled button' : 'ui active button'} style = {{floated : 'right'}} 
                onClick = {() => this.props.handleSelectCategory(this.state.categoryName, this.state.rating, this.state.categoryTitle)}>
                    Next
                </Button>
                {component}
            </div>
            

        </div>)
    }
}

export default CategorySelect