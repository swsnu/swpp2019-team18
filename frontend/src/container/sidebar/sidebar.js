import React, {Component} from 'react';
import moment from 'moment';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMode , setMonth, setYear, setDay, setCategory, setPersonId } from '../../store/actions/sidabar';
import { withRouter } from 'react-router';
import AddPeoplePopUp from '../addPeople/addPeopleModal'
import { getPeople } from '../../store/actions/people'
import { thisTypeAnnotation, thisExpression } from '@babel/types';
import {Menu, Grid, Dropdown, Label, Button, Container} from 'semantic-ui-react'



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

    /*shouldComponentUpdate(){
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(this.currentDay())
        console.log("********************************")
        console.log(this.year(), this.month());
    }*/

    years = [ ]

    componentDidMount(){
        this.props.getPeople();
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(this.currentDay())
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
        selectedCategory : '',
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
    successHandler = () => {
        this.props.getPeople();
    }

    moveToDiaryPage = () => {
        if(this.props.history.location.pathname === '/diary/create'){
            this.props.history.push('/diary')
        }
    }

    //mapping months to the list for dropdown optionso
    i = 0;
    months = moment.months().map(mon => {return {key : this.i++, value : mon, text : mon, onClick : ()=>this.onSelectMonthChange(mon)}});
    currYear = this.year()

    //mapping years to the list for dropdown options
    nums = [0,1,2,3,4,5,6,7,8,9,10]
    years = this.nums.map(i => {return {
        key : i, 
        value : String(this.year() - i ), 
        text : String(this.year() - i),
        onClick : () => this.onSelectYearChange(this.currYear - i)}
    })

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        monthNo = this.months.filter(obj => {return obj.value === month})[0].key
        console.log(monthNo)
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext : dateContext 
        })
    }

    onSelectMonthChange = (data) => {
        this.setMonth(data);
    }

   /* onChangeMonth = () => {
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
    } */

    monthNav = () => {       
        return(
        <Dropdown id = 'label_month' inline options = {this.months} value = {this.monthFull()}/>
            
          /*  <span className = "label_month"
                onClick = {() => {this.onChangeMonth(this.month())}}>
                {this.monthFull()}
                {this.state.monthPopup && 
                    <this.selectListMonth data={this.months}/>
                }                
            </span> */
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

    /*onChangeYear = () => {
        this.setState({
            yearPopup: !this.state.yearPopup,
            monthPopup : this.state.monthPopup && !this.state.monthPopup 
        });
    } */

    /*selectListYear = (props) => {
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
    } */

    
    yearNav = () => {
        return(
            <Dropdown id = 'label_year' inline options = {this.years} value = {this.year()} />
            /* <span className = "label_year"
                onClick = {() => {this.onChangeYear()}}>
                {this.year()}
                {this.state.yearPopup && 
                    <this.selectListYear data={this.years}/>
                }                
            </span> */
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
        this.props.updatePersonId('');
        this.props.updateCategory('');
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
            <Menu.Item  align = 'center' key= 'navigation'>
                <Grid columns = 'equal' >
                        <Grid.Column verticalAlign = 'middle' style = {{paddingLeft : '0', paddingRight : '0'}}> <this.monthNav/></Grid.Column>
                        <Grid.Column verticalAlign = 'middle' style = {{paddingLeft : '0', paddingRight : '0'}}>  <this.yearNav/></Grid.Column>
                </Grid>
            </Menu.Item>
      
        )
        for(let d = 1; d <= this.daysInMonth(); d++){
            let className = (d==this.currentDay() ? "current_day" : "day");
            calendarList.push(
                <Menu.Item style = {{padding :'10'}} key = {this.month() + '_' + String(d) }
                name = {this.month() + '' + String(d) }
                active = {className === 'current_day'}
                >
                    <Grid columns = 'equal'  >
                        <Grid.Column width = {14} style = {{marginLeft : '0', padding : '0'}}>
                        <Menu.Item fitted='horizontally'
                        id = {'day_' + String(d)}
                        onClick={() => {
                            this.onSelectDayChange(d)
                            console.log(this.props.history.location)
                            this.moveToDiaryPage()
                            }}>
                          {this.month()}  {d}
                        
                        </Menu.Item>
                        </Grid.Column>
                        <Grid.Column verticalAlign = 'middle' style = {{marginLeft : '0', paddingLeft : '0', passingRight : '0'}}>
                        <Button align = 'right' id = 'tag_create' size = 'mini' onClick = {() => this.props.history.push("/diary/create")} >+</Button>
                        </Grid.Column>

                    </Grid>
                    {/*<Link to="/diary"><div key={d} className={className} onClick={() => {this.onSelectDayChange(d)}}>
                    {this.month()}  {d} <div align = "right"><Link to="/diary/create" align="right">+</Link></div>
            </div></Link> */}
                </Menu.Item>
                
            )
        }

        return calendarList;

    }

    personItem = () => {
        const peopleList = [];
        peopleList.push(
            <Menu.Item align = 'center' key = 'addPeople'>
                <AddPeoplePopUp successHandler={this.successHandler}/>
            </Menu.Item>
        )
        for(let i=0; i < this.state.allPeople.length; i++){
            let tmpPersonId = this.state.allPeople[i].id;
            let tmpPerson = this.state.allPeople[i].name;
            let className = (this.state.allPeople[i].id == this.state.selectedPersonId ? 'selected_person' : 'person');
            peopleList.push(
                <Menu.Item 
                key = {tmpPersonId}
                id = {tmpPerson}
                name = {tmpPerson}
                active = {className === 'selected_person'}
                onClick={() => {
                    this.onSelectPersonChange(tmpPersonId)
                    this.moveToDiaryPage()
                }}
                >
                    <Grid  columns = 'equal'>
                        <Grid.Column style = {{marginLeft : '0', paddingLeft : '0', passingRight : '0'}}>
                        {tmpPerson}
                        </Grid.Column>
                    </Grid>
                    {/*<Link to="/diary"><div key={tmpPersonId} className={className} onClick={() => {this.onSelectPersonChange(tmpPersonId)}}>
                    {tmpPerson}
            </div></Link>*/}
                </Menu.Item>
                
            )
        }
        
        
        return peopleList;
    }

    categoryItem = () => {
        const categoryList = [];
        for(let i = 0; i<this.state.categories.length; i++){
            let tmpCategory = this.state.categories[i];
            let className = (this.state.selectedCategory == this.state.categories[i] ? "selected_category" : "category");
            categoryList.push(
                <Menu.Item 
                key = {tmpCategory}
                id = {tmpCategory}
                name = {tmpCategory} 
                onClick={() => {
                    this.onSelectCategoryChange(tmpCategory)
                    this.moveToDiaryPage()
                }} 
                active = {className === 'selected_category'}>
                    { /*<Link to="/diary"><div key={tmpCategory} className={className} onClick={() => {this.onSelectCategoryChange(tmpCategory)}}>
                    {tmpCategory}
            </div></Link>*/}

                </Menu.Item>
                
            )
        }
        return categoryList;
    }

    render() {
        return (
           
            <Container
            style={{
              position: "fixed",
              display: "flex",
              flexDirection: "column",
              top: 0,
              bottom: 0,
              left: 0,
              width: 265,
              background: "#FFFFFF",
              overflowX: "hidden",
              flex: 1
            }}
          >
              <Container style={{ flex: 1, overflowY: "scroll" }}>
              <Menu vertical compact fluid size = 'huge'>
                <Menu.Item>
                <Grid columns = 'equal' divided >
                        <Grid.Row >
                            <Button.Group id = 'tag' basic widths = '3'  >
                            <Button id= 'tag_calendar' align = 'center'onClick = {()=>this.modeChange("CALENDAR")}>CAL</Button>
                            <Button id = 'tag_person' align = 'center' onClick = {()=>this.modeChange("PERSON")}>PEO</Button>
                            <Button id = 'tag_category' align = 'center' onClick = {()=>this.modeChange("CATEGORY")}>CAT</Button>
                            </Button.Group>
                        </Grid.Row>
              </Grid>
                </Menu.Item>
                <Menu.Item>
                    <Container className="sidabar">
                    {
                        this.state.mode === "PERSON" ? <this.personItem/>
                        : this.state.mode === "CATEGORY" ? <this.categoryItem/> 
                        : <this.calendarItem/>
                    }
                </Container>
                </Menu.Item>

            </Menu></Container>;
              
          </Container>
            

            
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(sidebar));

/*
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
            */