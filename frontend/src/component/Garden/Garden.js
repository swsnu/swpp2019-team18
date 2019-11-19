import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {giveFlower, deleteGardenDiary} from '../../store/actions/gardendiary';

import {Grid, Icon, Label, Card, Segment, Container, Dimmer, Button, Header, Image} from 'semantic-ui-react';
import './Garden.css';


const mapDispatchToProps = dispatch => {
    return {
        onGiveFlower : (id) => dispatch(giveFlower(id)),
        onDeleteGardenDiary : (id) => dispatch(deleteGardenDiary(id)),
        //loginCheck : (user) => dispatch (actionCreators.loginCheckRequest())

    }
}

const mapStateToProps = state => {
    return {
      currentUser : state.user.status.currentUser
    }
  }

class Garden extends Component {
    state = {
        showDiary : false,
        active : false,
    }

    componentDidMount(){
        //this.props.loginCheck();

    }


    handleShow = () => {
        this.setState({ active: true });
        
    }
    handleHide = () => this.setState({ active: false })
   
    flowerHandler = (id) => {
        this.props.onGiveFlower(id);
    }
    deleteHandler = (id) => {
        this.props.onDeleteGardenDiary(id);
    }

    

    render(){
        const active = this.state.active;
        const date = this.props.shared_date.split('-');
        const year = date[0];
        const month = date[1];
        const day = date[2].split('T')[0];

        const flower = this.props.flower_users.includes(this.props.currentUser) ?
        <Button as='div' labelPosition='right' >
            <Button id = 'flower_button_red' color='red' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='asterisk' />
                Flower
            </Button>
                <Label as='a' basic color='red' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button> : 
        <Button as='div' labelPosition='right' >
            <Button id = 'flower_button_grey' color='grey' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='leaf' />
                Flower
            </Button>
            <Label as='a' basic color='grey' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button>

        const popupDiary = 
        <div className = 'gardenDetail' style={{ marginLeft: 265}}>
        <Dimmer.Dimmable as={Segment} blurring dimmed={active}>
        <Dimmer active={active} onClickOutside={this.handleHide} page>
            <Segment.Group style = {{width : 700}} >
            <Segment textAlign = 'left'>
                <Label as='a' color='olive' tag>
                    {this.props.category_name}
                    {this.props.category_title ? <Label.Detail id='category_title'>{this.props.category_title}</Label.Detail>  : null}
                    {/* {this.props.rating ? <Label.Detail>{this.props.rating}</Label.Detail> : null} */}
                </Label>
                {this.props.currentUser === this.props.author ? 
                    <Button id = 'garden_delete_button' floated = 'right' onClick = {() => this.deleteHandler(this.props.id)}>Delete</Button> : null}

            </Segment>
            <Segment inverted >
             {
                this.props.content 
            }

             </Segment>
            <Segment textAlign = 'center'>
                {flower}         
            </Segment>
            </Segment.Group>
        </Dimmer>
        </Dimmer.Dimmable>

        </div> 

    return (
        <div className = 'gardenDiaryDetail' >
      
        <Grid.Column>
        <Button compact id = 'garden_detail_button' onClick={this.handleShow} >

            <Card>
                <Image bordered src='data:image/jpeg;base64,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'
                            size='medium' 
                            
                            />
                
                <Card.Content>
                    <Card.Header>{this.props.category_name}</Card.Header>
                    <Card.Meta>
                        
                        <span className = 'date'>Shared in {year}.{month}.{day}</span>
                    </Card.Meta>
                    <Card.Description className = 'content_preview'>
                        {this.props.content}
                })}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra >
                        <Icon name = 'asterisk' />
                        {this.props.flower_count} Flowers
                </Card.Content>
                </Card>
            </Button>
                
        </Grid.Column>
        {
            active ? popupDiary : null
        }
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Garden));
