import React, {Component} from 'react';
import moment from 'moment';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMode , setMonth, setYear, setDay, setCategory } from '../../store/actions/sidabar';
import { withRouter } from 'react-router';
//import AddPeoplePopUp from 

let mapDispatchToProps = (dispatch) => {
    return {
        updateMode : (value) => dispatch(setMode(value)),
        updateYear : (value) => dispatch(setYear(value)),
        updateMonth : (value) => dispatch(setMonth(value)),
        updateDay : (value) => dispatch(setDay(value)),
        updateCategory : (value) => dispatch(setCategory)
    }
}

class sidebar extends Component {

    componentWillMount() {
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(this.currentDay())
    }

    
    state = {
        dateContext : moment(),
        mode : "CALENDAR",
        monthPopup: false,
        yearPopup: false,
        categories : ['MOVIE','PEOPLE','DATE','TRAVEL'],
        selectedCategory : 'MOVIE'
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

    onSelectMonthChange = (data) => {
        this.setMonth(data);
    }

    onChangeMonth = () => {
        this.setState({
            monthPopup : !this.state.monthPopup,
            yearPopup : this.state.yearPopup && !this.state.yearPopup
        });
    }

    selectListMonth = (props) => {
        let popup = props.data.map((data) => {
            return(
                <div key={data}>
                    <div onClick = {()=>this.onSelectMonthChange(data)}>
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
                onClick = {() => {this.onChangeMonth(this.month())}}>
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

    onSelectYearChange = (data) => {
        this.setYear(data);
    }

    onChangeYear = () => {
        this.setState({
            yearPopup: !this.state.yearPopup,
            monthPopup : this.state.monthPopup && !this.state.monthPopup 
        });
    }

    selectListYear = (props) => {
        let popup = props.data.map((data) => {
            return(
                <div key={data}>
                    <div onClick = {()=>this.onSelectYearChange(data)}>
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
                onClick = {() => {this.onChangeYear()}}>
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
        this.setState({
            dateContext : dateContext 
        })
    }

    onSelectDayChange = (d) => {
        this.setDay(d);
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(d)
    }

    modeChange = (d) => {
        this.setState({mode : d});
        this.props.updateMode(d);
    }

    onSelectCategoryChange = (category) => {
        this.setState({selectedCategory:category});
        this.props.updateCategory(category);
        
    }

    render() {
        let calendarList = [];
        calendarList.push(
            <div>
                <this.monthNav/>
                {" "}
                <this.yearNav/>
            </div>
        )
        for(let d = 1; d <= this.daysInMonth(); d++){
            let className = (d==this.currentDay() ? "current_day" : "day");
            calendarList.push(
                <Link to="/diary"><div key={d} className={className} onClick={() => {this.onSelectDayChange(d)}}>
                    {this.month()}  {d} <div align = "right"><Link to="/diary/create" align="right">+</Link></div>
                </div></Link>
            )
        }
        

        let categoryList = [];
            /*categoryList.push(
                <div>
                <Link to="/diary"><div key='MOVIE' className='category' onClick={() => {this.onSelectDayChange('MOVIE')}}>MOVIE</div></Link>
                <Link to="/diary"><div key='PEOPLE' className='category' onClick={() => {this.onSelectDayChange('PEOPLE')}}>PEOPLE</div></Link>
                <Link to="/diary"><div key='DATE' className='category' onClick={() => {this.onSelectDayChange('DATE')}}>DATE</div></Link>
                <Link to="/diary"><div key='TRAVEL' className='category' onClick={() => {this.onSelectDayChange('TRAVEL')}}>TRAVEL</div></Link>
                </div>
            )*/
            for(let i = 0; i<this.state.categories.length; i++){
                let tmpCategory = this.state.categories[i];
                let className = (this.state.selectedCategory == this.state.categories[i] ? "selected_category" : "category");
                categoryList.push(
                    <Link to="/diary"><div className={className} onClick={() => {this.onSelectCategoryChange(tmpCategory)}}>
                        {tmpCategory}
                    </div></Link>
                )
            }
        
        let peopleList = [];
            peopleList.push(
                <d>people!</d>

            )

        return (
            <div className="sidebar_container">
                
                <div className = "tab">
                <button onClick = {()=>this.modeChange("CALENDAR")}>Cal</button><button onClick = {()=>this.modeChange("PERSON")}>Peo</button><button onClick = {()=>this.modeChange("CATEGORY")}>Cat</button>
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