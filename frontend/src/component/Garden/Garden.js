import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {giveFlower} from '../../store/actions/gardendiary';

import {Grid, Icon, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';


const mapDispatchToProps = dispatch => {
    return {
        onGiveFlower : (id) => dispatch(giveFlower(id))
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

    componentDidUpdate(prevProps){
       
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
       

        const flower = 
        <Button as='div' labelPosition='right' floated = 'left'>
            <Button color='red' onClick = {() => this.flowerHandler(this.props.id)}>
            <Icon name='asterisk' />
        Flower
         </Button>
        <Label as='a' basic color='red' pointing='left'>
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

export default connect(null, mapDispatchToProps)(withRouter(Garden));
