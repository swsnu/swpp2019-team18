import React, {Component} from 'react';
import moment from 'moment';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMode , setMonth, setYear, setDay, setCategory, setPersonId } from '../../store/actions/sidabar';
import { withRouter } from 'react-router';
import AddPeoplePopUp from '../addPeople/addPeopleModal'
import { getPeople } from '../../store/actions/people'
//import AddPeoplePopUp from 



const mapDispatchToProps = (dispatch) => {
    return {
        updateMode : (value) => dispatch(setMode(value)),
        updateYear : (value) => dispatch(setYear(value)),
        updateMonth : (value) => dispatch(setMonth(value)),
        updateDay : (value) => dispatch(setDay(value)),
        updateCategory : (value) => dispatch(setCategory(value)),
        updatePersonId : (value) => dispatch(setPersonId(value)),
        getPeople : () => dispatch(getPeople())
    }
}

const mapStateToProps = state => {
    return{
        allPeople : state.diary.allPeople,
    }
}

 

class sidebar extends Component {

    /*componentWillMount() {
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(this.currentDay())
    }*/

    componentDidMount(){
        this.props.getPeople();
        this.props.updateYear(this.year());
        this.props.updateMonth(this.monthNum());
        this.props.updateDay(this.currentDay());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allPeople !== undefined && nextProps.allPeople.length > 0 && prevState.allPeople !== nextProps.allPeople ){
            return {...prevState, allPeople : nextProps.allPeople};
        }
        return prevState;
    }

    state = {
        dateContext : moment(),
        mode : "CALENDAR",
        monthPopup: false,
        yearPopup: false,
        categories : ['MOVIE','PEOPLE','DATE','TRAVEL'],
        selectedCategory : 'MOVIE',
        allPeople : [],
        selectedPersonId : '',
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
        //console.log(this.monthNum())
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(d)
    }

    modeChange = (d) => {
        this.setState({mode : d});
        this.props.updateMode(d);
    }

    onSelectCategoryChange = (category) => {
        this.setState({selectedCategory : category});
        this.props.updateCategory(category);
        
    }

    onSelectPersonChange = (personId) => {
        this.setState({selectedPersonId : personId});
        this.props.updatePersonId(personId);
    }
    

    calendarItem = () => {
        const calendarList = [];
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

        return calendarList;

    }

    personItem = () => {
        const peopleList = [];
        for(let i=0; i < this.state.allPeople.length; i++){
            let tmpPersonId = this.state.allPeople[i].id;
            let tmpPerson = this.state.allPeople[i].name;
            let className = (this.state.allPeople[i].id == this.state.selectedPersonId ? 'selected_person' : 'person');
            peopleList.push(
                <Link to="/diary"><div key={tmpPersonId} className={className} onClick={() => {this.onSelectPersonChange(tmpPersonId)}}>
                    {tmpPerson}
                </div></Link>
            )
        }
        peopleList.push(
            <div>
            <AddPeoplePopUp/>
            </div>
        )
        
        return peopleList;
    }

    categoryItem = () => {
        const categoryList = [];
        for(let i = 0; i<this.state.categories.length; i++){
            let tmpCategory = this.state.categories[i];
            let className = (this.state.selectedCategory == this.state.categories[i] ? "selected_category" : "category");
            categoryList.push(
                <Link to="/diary"><div key={tmpCategory} className={className} onClick={() => {this.onSelectCategoryChange(tmpCategory)}}>
                    {tmpCategory}
                </div></Link>
            )
        }

        return categoryList;
    }

    


    render() {
        return (
            <div className="sidebar_container">
                
                <div className = "tab">
                <button onClick = {()=>this.modeChange("CALENDAR")}>Cal</button><button onClick = {()=>this.modeChange("PERSON")}>Peo</button><button onClick = {()=>this.modeChange("CATEGORY")}>Cat</button>
                </div>

                
                
                <div className="sidabar">
                    {
                        this.state.mode === "PERSON" ? <this.personItem/>
                        : this.state.mode === "CATEGORY" ? <this.categoryItem/> 
                        : <this.calendarItem/>
                    }
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(sidebar));