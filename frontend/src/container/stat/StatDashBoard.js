import React, { Component } from 'react';
import BaseLineChart from '../../component/Stat/Stat';
import StatSideBar from './StatSideBar';
import { Menu } from 'semantic-ui-react';
import { getCategory, getStatCal, getStatistics } from '../../store/actions/statistics';
import { getPeople } from '../../store/actions/people';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class StatDashBoard extends Component {

    state = {
        mode : "CAL",
        items : [],
        selectedItem : null,
        graph_data : [],
    }

    changeMode = (newMode) => {
        this.setState({mode : newMode});
    }

    getItems = (mode) => {
        if(mode === "CAL"){
            this.props.getStatCal();
        }
        else if (mode === "PER"){
            this.props.getPeople();
        }
        else{
            this.props.getCategory();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log("getDerivedStateFromProps");
        console.log(nextProps.graph_data);
        if(nextProps.items !== undefined && (nextProps.items !== prevState.items)){
            return {...prevState, items : nextProps.items};
        }
        return {...prevState};
    }

    componentDidMount(){
        document.body.style.backgroundColor = "white";
        this.getItems(this.state.mode);
        this.props.getStatistics();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.mode !== this.state.mode){
            this.getItems(this.state.mode);
        }

    }

    onSelectItemChange = (item) => {
        this.setState({selectedItem : item});
    }

    loadItems = () => {
        const itemList = [];
        for(let i = 0; i < this.state.items.length; i++){
            let curItem = this.state.items[i];
            let className = (this.state.selectedItem === this.state.items[i] ? "selectedItem" : "item");
            itemList.push(
                <Menu.Item 
                key = {curItem}
                id = {curItem}
                name = {curItem} 
                onClick={() => {
                    this.onSelectItemChange(curItem)
                }} 
                active = {className === 'selectedItem'}>
                </Menu.Item>
            )
        }
        return itemList;
    }

    loadData = () => {

    }

    data = [
        {day: '11/31', score : 50, dairy_id : 1},
        {day: '10/1', score: 200, diary_id : 2},
        {day: '10/2', score: 100, diary_id : 3},
        {day: '10/3', score: 50, diary_id : 4},
        {day: '10/4', score: 80, diary_id : 4},
        {day: '10/5', score: 60, diary_id : 4},
        {day: '10/6', score: 70, diary_id : 4},
        {day: '10/7', score: 80, diary_id : 4},
        {day: '10/8', score: 90, diary_id : 4},
        {day: '10/9', score: 100, diary_id : 4},
        {day: '10/10', score: 20, diary_id : 4},
        {day: '10/11', score: 40, diary_id : 4},
    ];

    render(){
        let items = this.loadItems();
        return (
            <div className='dashboard' >
                <StatSideBar mode={this.state.mode} changeMode={this.changeMode} items={items}/>
                <BaseLineChart data={this.props.graph_data}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatCal : () => dispatch(getStatCal()),
        getPeople : () => dispatch(getPeople()),
        getCategory : () => dispatch(getCategory()), 
        getStatistics : () => dispatch(getStatistics()),
    }
}

const mapStateToProps = (state) => {
    return {
        items : state.diary.items,
        graph_data : state.diary.graph_data,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StatDashBoard));