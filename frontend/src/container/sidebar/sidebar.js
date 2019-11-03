import React, {Component} from 'react';
import moment from 'moment';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMode , setMonth, setYear, setDay } from '../../store/actions/sidabar';
import {withRouter} from 'react-router';

let mapDispatchToProps = (dispatch) => {
    return {
        updateMode : (value) => dispatch(setMode(value)),
        updateYear : (value) => dispatch(setYear(value)),
        updateMonth : (value) => dispatch(setMonth(value)),
        updateDay : (value) => dispatch(setDay(value))
    }
}

class sidebar extends Component {

    
    
    state = {
        dateContext : moment(),
        mode : "calendar",
        monthPopup: false,
        yearPopup: false
    }

    year = () => {
        return this.state.dateContext.format("YYYY");
    }

    month = () => {
        return this.state.dateContext.format("MMM");
    }

    monthNum = () => {
        return this.state.dateContext.format("MM")
    }

    monthFull = () => {
        return this.state.dateContext.format("MMMM")
    }

    selectedDate = () => {
        return this.state.dateContext.format("YYYYMD")
    }

    currentDay = () => {
        return this.state.dateContext.format("D")
    }

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }

    months = moment.months();

    years = [this.year(),
            this.year()-1,
            this.year()-2,
            this.year()-3,
            this.year()-4,
            this.year()-5,
            this.year()-6,
            this.year()-7,
            this.year()-8,
            this.year()-9,
            this.year()-10]


    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext : dateContext 
        })
    }

    onSelectMonthChange = (e, data) => {
        this.setMonth(data);
    }

    onChangeMonth = (e, month) => {
        this.setState({
            monthPopup: !this.state.monthPopup
        });
    }

    selectListMonth = (props) => {
        let popup = props.data.map((data) => {
            return(
                <div key={data}>
                    <div onClick = {(e)=>this.onSelectMonthChange(e, data)}>
                        {data}
                    </div>                    
                </div>
            )
        })

        return (
            <div className="month_popup">
                {popup}
            </div>
        )
    }

    

    monthNav = () => {       
        return(
            <span className = "label_month"
                onClick = {(e) => {this.onChangeMonth(e,this.month())}}>
                {this.monthFull()}
                {this.state.monthPopup && 
                    <this.selectListMonth data={this.months}/>
                }                
            </span>
        )
    }


    setYear = (year) => {
        let yearNo = year;
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", yearNo);
        this.setState({
            dateContext : dateContext 
        })
    }

    onSelectYearChange = (e, data) => {
        this.setYear(data);
    }

    onChangeYear = (e, year) => {
        this.setState({
            yearPopup: !this.state.yearPopup
        });
    }

    selectListYear = (props) => {
        let popup = props.data.map((data) => {
            return(
                <div key={data}>
                    <div onClick = {(e)=>this.onSelectYearChange(e, data)}>
                        {data}
                    </div>                    
                </div>
            )
        })

        return (
            <div className="year_popup">
                {popup}
            </div>
        )
    }

    
    yearNav = () => {
        return(
            <span className = "label_year"
                onClick = {(e) => {this.onChangeYear(e, this.year())}}>
                {this.year()}
                {this.state.yearPopup && 
                    <this.selectListYear data={this.years}/>
                }                
            </span>
        )
    }    

    setDay = (d) => {
        let dayNo = d;
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("date", dayNo);
        console.log(this.selectedDate())
        this.setState({
            dateContext : dateContext 
        })
        {/*console.log(this.selectedDate())*/}

    }

    onSelectDayChange = (d) => {
        this.setDay(d);
        console.log(this.selectedDate());
        console.log(this.monthNum())
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(d)
    }

    modeChange = (d) => {
        this.setState({mode : d});
        this.props.updateMode(d);
    }

    


    render() {
        let calendarList = [];
        for(let d = 1; d <= this.daysInMonth(); d++){
            let className = (d==this.currentDay() ? "current_day" : "day");
            calendarList.push(
                <Link to="/diary"><div key={d} className={className} onClick={() => {this.onSelectDayChange(d)}}>
                    {this.month()}  {d} <div align = "right"><Link to="/diary/create" align="right">+</Link></div>
                </div></Link>
            )
        }

        let categoryList = [];
            categoryList.push(
                <d>categories</d>
            )
        
        let peopleList = [];
            peopleList.push(
                <d>people!</d>
            )

        return (
            <div className="sidebar_container">
                
                <div className = "tab">
                <button onClick = {()=>this.modeChange("CALENDAR")}>Cal</button><button onClick = {()=>this.modeChange("PERSON")}>Peo</button><button onClick = {()=>this.modeChange("CATEGORY")}>Cat</button>
                </div>

                <div>
                    <this.monthNav/>
                    {" "}
                    <this.yearNav/>
                </div>
                
                <div className="sidabar">
                    {
                        this.state.mode === "PERSON" ? <div>{peopleList}</div>
                        : this.state.mode === "CATEGORY" ? <div>{categoryList}</div> : <div>{calendarList}</div>
                    }
                </div>
                
            </div>

        );
    }
}

export default connect(null,mapDispatchToProps)(withRouter(sidebar));