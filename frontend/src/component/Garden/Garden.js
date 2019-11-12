import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {giveFlower} from '../../store/actions/gardendiary';

import {Grid, Icon, Label, Divider, Segment, Container, Dimmer, Button, Header, Image} from 'semantic-ui-react';
//import './Garden.css';
import * as actionCreators from '../../store/actions/login'

const mapDispatchToProps = dispatch => {
    return {
        onGiveFlower : (id) => dispatch(giveFlower(id)),
        loginCheck : (user) => dispatch (actionCreators.loginCheckRequest())

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
        changedContent : '',
        active : false,
        popupMode : 'INIT',
        content : '',
    }

    componentDidMount(){
        //this.props.loginCheck();

    }

    onClickMenuShareButton = (id, content) => {
        this.setState({popupMode : 'SHARE'})
        this.setState({ active: true })
        this.setState({ content: content })
        /*let changedContent = prompt('edit content before sharing', content);
        if(changedContent !== '' && changedContent !== null){
            this.props.onShareDiary(id, changedContent);
        } */

    }
    handleShow = () => {
        this.setState({ active: true });
        
    }
    handleHide = () => this.setState({ active: false })
   
    flowerHandler = (id) => {
        this.props.onGiveFlower(id);
    }

    

    render(){
        console.log(this.props.content)

        const active = this.state.active;
        const flower = this.props.flower_users.includes(this.props.currentUser) ?
        <Button as='div' labelPosition='right' >
            <Button color='red' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='asterisk' />
                Flower
            </Button>
                <Label as='a' basic color='red' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button> : 
        <Button as='div' labelPosition='right' >
            <Button color='grey' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='leaf' />
                Flower
            </Button>
            <Label as='a' basic color='grey' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button>

        const popupDiary = 
        <div className = 'gardenDetail' style={{ marginLeft: 265}}>
        <Dimmer active={active} onClickOutside={this.handleHide} page>
            <Segment.Group style = {{width : 700}} >
            <Segment textAlign = 'center'>
            <Label as='a' color='olive' tag>
                    {this.props.category_name}
                    {this.props.category_title ? <Label.Detail >{this.props.category_title}</Label.Detail>  : null}
                    {/* {this.props.rating ? <Label.Detail>{this.props.rating}</Label.Detail> : null} */}
                </Label>

            </Segment>
            <Segment textAlign = 'justified'>
             {
                this.props.content ? 
                this.props.content.split('\n').map( line => {
                return (<span>{line}<br/></span>)
                }) : null
            }

             </Segment>
            <Segment textAlign = 'center'>
                {flower}
            </Segment>
            </Segment.Group>
        </Dimmer>
        </div>

    return (
        <div className = 'gardenDiaryDetail' >
            
            <Grid.Column>

         <Button><Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vFmT1904oOOPKxIfNITLL3rKY2dVZ6YnDgSTS8sTkFP09Hn0Kg&s'
                        size='small' 
                        onClick={this.handleShow} /></Button>
            </Grid.Column>

            {
                active ? popupDiary : null
            }
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Garden));
