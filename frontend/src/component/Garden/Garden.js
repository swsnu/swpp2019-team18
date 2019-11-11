import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {giveFlower} from '../../store/actions/gardendiary';

import {Grid, Icon, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';

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
        showMenu : false,
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
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
   
    flowerHandler = (id) => {
        this.props.onGiveFlower(id);
    }

    render(){
       console.log(this.props.currentUser);
        const flower = this.props.flower_users.includes(this.props.currentUser) ?
        <Button as='div' labelPosition='right' floated = 'left'>
            <Button color='red' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='asterisk' />
                Flower
            </Button>
                <Label as='a' basic color='red' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button> : 
        <Button as='div' labelPosition='right' floated = 'left'>
            <Button color='gray' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='leaf' />
                Flower
            </Button>
            <Label as='a' basic color='gray' pointing='left'>
                {this.props.flower_count}
            </Label>
        </Button>



    return (
        <div className = 'gardenDiaryDetail' >
            <Segment>
            <Container textAlign = 'left'>
            <Label as='a' color='olive' tag>
                    {this.props.category_name}
                    {this.props.category_title ? <Label.Detail >{this.props.category_title}</Label.Detail>  : null}
                    {/* {this.props.rating ? <Label.Detail>{this.props.rating}</Label.Detail> : null} */}
                </Label>
             </Container>
             <Divider />
             <Container textAlign = 'justified'>
             {
                this.props.content ? 
                this.props.content.split('\n').map( line => {
                return (<span>{line}<br/></span>)
                }) : null
            }
             </Container>
             <Divider />
             <Container>
                 <Grid>
             {flower}
             </Grid>
            </Container>
            </Segment>
            <Divider hidden /> 
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Garden));
