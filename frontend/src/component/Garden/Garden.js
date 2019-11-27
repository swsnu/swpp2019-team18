import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {giveFlower, deleteGardenDiary} from '../../store/actions/gardendiary';

import {Grid, Icon, Label, Segment, Dimmer, Button} from 'semantic-ui-react';
import './Garden.css';

const mapDispatchToProps = dispatch => {
    return {
        onGiveFlower : (id) => dispatch(giveFlower(id)),
        onDeleteGardenDiary : (id) => dispatch(deleteGardenDiary(id)),


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
                <Label basic color='red' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button> : 
        <Button as='div' labelPosition='right' >
            <Button id = 'flower_button_grey' color='grey' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='leaf' />
                Flower
            </Button>
            <Label basic color='grey' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button>

        const popupDiary = 
        <div className = 'popup'>
        <Dimmer.Dimmable as={Segment} blurring dimmed={active}>
        <Dimmer active={active} onClickOutside={this.handleHide} page>
            <Segment.Group style = {{width : 700}} >
            <Segment textAlign = 'left'>
                <Label as='a' color='olive' tag>
                    {this.props.category_name}
                    {this.props.category_title ? <Label.Detail id='category_title'>{this.props.category_title}</Label.Detail>  : null}
                    {this.props.rating ? <Label.Detail>{this.props.rating}</Label.Detail> : null}
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

        <div>
            <a className="card" onClick = {this.handleShow} >        
        <div>
            <h1>{this.props.category_name}{this.props.category_title ? ' - ' + this.props.category_title : null}</h1>
            <p className='preview'>{this.props.content}</p>
            <div className="date">Shared in {year}.{month}.{day}</div>
            <div className="tags">
                <div className="tag">{this.props.flower_count} Flowers</div>
            </div>
        </div>
            </a>
        </div>
                
        </Grid.Column>
        {
            active ? popupDiary : null
        }
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Garden))