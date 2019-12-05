import React, {Component} from 'react'
import { Grid, Button, Form, Container,  Label, Header, Rating, GridColumn } from 'semantic-ui-react';

class GetCategoryTitle extends Component{

    state = {
        categoryTitle : '',
        rating : null,
    }

    handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating })

    render () {
        let confirmTitleButton = <Button size = 'mini' id = 'title-confirm-button' onClick = {() => this.props.handleTitle(this.state.categoryTitle, this.state.rating)}>ok!</Button>
        let getTitleInput = <Form.Input 
                        id='diary-category-title-input'
                        value={this.state.categoryTitle}
                        onChange={e => this.setState({categoryTitle : e.target.value})}
                        />
        let getTitleComponent = null;

        if(this.props.selectedCategoryType === 1){
                getTitleComponent = <Container id ='category-type-one'>
                    <Grid columns= 'equal'>
                        <Grid.Row>
                            <Grid.Column>
                            <Label as='a' color='blue' image>
                    {this.props.categoryName}
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column>
                        <Header as ='h4'>Title/Name of the {this.props.categoryName} ?</Header>
                    {getTitleInput}
                        </Grid.Column>
                        <GridColumn>
                        <Header as ='h4'>How was that {this.props.categoryName} ?</Header>
                    <Rating icon='star' id='category-rating' defaultRating={3} maxRating={5} onRate={this.handleRate} />
                        </GridColumn>
                        <Grid.Column>
                        {confirmTitleButton}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>     
                </Container>
            }
        else if (this.props.selectedCategoryType === 2){
                getTitleComponent = <Container id ='category-type-two'>
                    <Grid columns= 'equal'>
                        <Grid.Row>
                            <Grid.Column>
                            <Label as='a' color='blue' image>
                    {this.props.categoryName}
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column width = {13}>
                        <Header as ='h4'>If You want, tell me brief information about things you did...</Header>
                    {getTitleInput}
                        </Grid.Column>
                        <Grid.Column>
                        {confirmTitleButton}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>  
                </Container>
            }
        else if (this.props.selectedCategoryType === 3){
                getTitleComponent =  <Container id ='category-type-three'>                    
                        <Label as='a' color='blue' image>
                            {this.props.categoryName}
                        </Label>
                    </Container>

            }
        return getTitleComponent 
        }

      
}

export default GetCategoryTitle



