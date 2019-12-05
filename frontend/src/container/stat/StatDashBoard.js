import React, { Component } from 'react';
import BaseBarChart from '../../component/Stat/BarChart';
import BaseAreaChart from '../../component/Stat/BaseAreaChart';
import BaseLineChart from '../../component/Stat/BaseLineChart';
import BasePieChart from '../../component/Stat/PieChart';
import { getStatistics, getCategoryFrequency } from '../../store/actions/statistics';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./StatDashBoard.css";

class StatDashBoard extends Component {

    state = {
        mode : null,
        items : [],
        selectedItem : null,
        friendData : {'graph_data' : [], },
        calendarData : {'graph_data' : [], }, 
        categoryData : {'graph_data' : [], },
        categoryFreqData : {'graph_data' : [], },
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.friendData !== undefined && (nextProps.friendData !== prevState.friendData)){
            return {...prevState, friendData : nextProps.friendData};
        }
        if(nextProps.calendarData !== undefined && (nextProps.calendarData !== prevState.calendarData)){
            return {...prevState, calendarData : nextProps.calendarData};
        }
        if(nextProps.categoryData !== undefined && (nextProps.categoryData !== prevState.categoryData)){
            return {...prevState, categoryData : nextProps.categoryData};
        }
        if(nextProps.categoryFreqData !== undefined && (nextProps.categoryFreqData !== prevState.categoryFreqData)){
            console.log("==================================");
            console.log(nextProps.categoryFreqData)
            console.log("==================================");
            return {...prevState, categoryFreqData : nextProps.categoryFreqData};
        }
        return {...prevState};
    }

    componentDidMount(){
        document.body.style.backgroundColor = "white";
        this.props.getStatistics({mode : "CALENDAR"});
        this.props.getStatistics({mode : "CATEGORY"});
        this.props.getStatistics({mode : "PEOPLE"});
        this.props.getCategoryFrequency();
    }

    render(){
        let friendChart = <div className="friendChart"><BaseBarChart data={this.state.friendData.graph_data } 
            dataKey="friend_name" color="#5CC6B8" colorName="friend"/></div>;
        let calendarChart = <div className="calendarChart"><BaseAreaChart data={this.state.calendarData.graph_data } 
            history={this.props.history}/></div>;
        let categoryChart = <div className="categoryChart"><BaseBarChart data={this.state.categoryData.graph_data } 
            dataKey="category_name" color="#2379B3" colorName="category"/></div>;
        let categoryFrequencyChart = <div className="categoryFrequencyChart">
            <BasePieChart data={this.state.categoryFreqData.graph_data}/> </div>

        let calenderPercent = 0;
        if(this.state.calendarData.meta !== undefined){
            calenderPercent = this.state.calendarData.meta.percent;
        }
        else{
            calenderPercent = 0;
        }
        let bestFriend = ""
        if(this.state.friendData.meta !== undefined){
            bestFriend = this.state.friendData.meta.best_friend
        }
        let bestCategory = ""
        if(this.state.categoryData.meta !== undefined){
            bestCategory = this.state.categoryData.meta.best_category
        }

        let categoryPercent = 0;
        let maxFrequentCategory = "";
        if(this.state.categoryFreqData.meta !== undefined){
            categoryPercent = this.state.categoryFreqData.meta.percent;
            maxFrequentCategory = this.state.categoryFreqData.meta.frequent_category;
        }
        return (
            <div className='dashboard' >
                {/* <StatSideBar mode={this.state.mode} changeMode={this.changeMode} items={items}/> */}
                <div className="dailyStat">
                    <h1> Monthly Happiness</h1>
                    <p> You're <span className="bold"> {calenderPercent}%</span> more happier on average than last month</p>
                </div>
                {calendarChart}
                {friendChart}
                <div className="friendStat">
                    <h1> Friend Happiness</h1>

                    <p> You feel much happier when you meet <span className="bold"> {bestFriend} </span></p>
                </div>
                <div className="categoryStat">
                    <h1> Activity Happiness</h1>
                    <p> If you're sad now, S.DA recommends you to do spend time on  <span className="bold"> {bestCategory} </span> category </p>
                </div>
                {categoryChart}
                {categoryFrequencyChart}
                <div className="categoryFrequencyStat">
                    <h1> Activity Insights</h1>
                    <p> You're using <span className="bold"> {categoryPercent}%</span> of time on <span className="bold">{maxFrequentCategory}</span> Category </p>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatistics : (queryObj) => dispatch(getStatistics(queryObj)),
        getCategoryFrequency : () => dispatch(getCategoryFrequency()),
    }
}

const mapStateToProps = (state) => {
    return {
        friendData : state.diary.friendData,
        calendarData : state.diary.calendarData,
        categoryData : state.diary.categoryData,
        categoryFreqData : state.diary.categoryFreqData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StatDashBoard));