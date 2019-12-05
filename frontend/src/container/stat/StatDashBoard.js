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
        friendData : [],
        calendarData : [], 
        categoryData : [],
        categoryFreqData : [],
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps.items);
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
        let friendChart = <div className="friendChart"><BaseBarChart data={this.state.friendData } 
            dataKey="friend_name" color="#5CC6B8" colorName="friend"/></div>;
        let calendarChart = <div className="calendarChart"><BaseAreaChart data={this.state.calendarData } 
            history={this.props.history}/></div>;
        let categoryChart = <div className="categoryChart"><BaseBarChart data={this.state.categoryData } 
            dataKey="category_name" color="#2379B3" colorName="category"/></div>;
        let categoryFrequencyChart = <div className="categoryFrequencyChart">
            <BasePieChart data={this.state.categoryFreqData}/> 
        </div>
        return (
            <div className='dashboard' >
                {/* <StatSideBar mode={this.state.mode} changeMode={this.changeMode} items={items}/> */}
                <div className="dailyStat">
                    <h1> Monthly Happiness</h1>
                    <p> You're <span className="bold"> 32%</span> more happier on average than last month</p>
                </div>
                {calendarChart}
                {friendChart}
                <div className="friendStat">
                    <h1> Friend Happiness</h1>
                    <p> You're <span className="bold"> 32%</span> more happier on average than last month</p>
                </div>
                <div className="categoryStat">
                    <h1> Activity Happiness</h1>
                    <p> If you're sad now, S.DA recommends you to do spend time on  <span className="bold"> SPORT </span> category </p>
                </div>
                {categoryChart}
                {categoryFrequencyChart}
                <div className="categoryFrequencyStat">
                    <h1> Activity Insights</h1>
                    <p> You're using <span className="bold"> 57%</span> of time on <span className="bold">PEOPLE</span> Category </p>
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