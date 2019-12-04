import React, {Component} from 'react';
import moment from 'moment';
import './sidebar.css';
import { connect } from 'react-redux';
import { setMode , setMonth, setYear, setDay, setCategory, setPersonId, setGardenMode, setGardenCategory } from '../../store/actions/sidabar';
import { withRouter } from 'react-router';
import AddPeoplePopUp from '../addPeople/addPeopleModal'
import { getPeople } from '../../store/actions/people'
import {Menu, Grid, Dropdown, Button, Container} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';




const mapDispatchToProps = (dispatch) => {
    return {
        updateMode : (value) => dispatch(setMode(value)),
        updateYear : (value) => dispatch(setYear(value)),
        updateMonth : (value) => dispatch(setMonth(value)),
        updateDay : (value) => dispatch(setDay(value)),
        updateCategory : (value) => dispatch(setCategory(value)),
        updatePersonId : (value) => dispatch(setPersonId(value)),
        updateGardenMode : (value) => dispatch(setGardenMode(value)),
        updateGardenCategory : (value) => dispatch(setGardenCategory(value)),
        getPeople : () => dispatch(getPeople())
    }
}

const mapStateToProps = state => {
    return{
        allPeople : state.diary.allPeople,
    }
}

 

class sidebar extends Component {

    componentDidMount(){
        this.props.getPeople();
        this.props.updateYear(this.year())
        this.props.updateMonth(this.monthNum())
        this.props.updateDay(this.currentDay())
        console.log(this.props.history.location.pathname)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allPeople !== undefined && nextProps.allPeople.length > 0 && prevState.allPeople !== nextProps.allPeople ){
            return {...prevState, allPeople : nextProps.allPeople};
        }
        return prevState;
    }

    state = {
        dateContext : moment(),
        startDayOfWeek : moment().startOf('isoWeek'),
        mode : "CALENDAR",
        gardenMode : "ALL",
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
        this.props.history.push('/diary')
    }

    //mapping months to the list for dropdown optionso
    i = 0;
    months = moment.months().map(mon => {return {key : this.i++, value : mon, text : mon, onClick : ()=>this.onSelectMonthChange(mon)}});

    //mapping years to the list for dropdown options
    currYear = this.year()
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


    /*monthNav = () => {       
        return(
        <Dropdown id = 'label_month' inline options = {this.months} value = {this.monthFull()}/>
        )
    }*/


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

    /*yearNav = () => {
        return(
            <Dropdown id = 'label_year' inline options = {this.years} value = {this.year()} />
        )
    }    */

    setDay = (d) => {
        let dayNo = d;
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("date", dayNo);
        this.setState({
            dateContext : dateContext 
        })
    }

    onSelectDayChange = (d) => {
        console.log('------------------------------')
        console.log(d)
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

    onSelectGardenModeChange = (gardenMode) => {
        this.setState({gardenMode : gardenMode});
        this.props.updateGardenMode(gardenMode);
    }

    onSelectGardenCategory = (category) => {
        this.props.updateGardenMode('CATEGORY');
        this.props.updateGardenCategory(category);
        this.setState({gardenMode : 'CATEGORY'});
    }

    handleChange = (date) => {
        const selectedDay = moment(date)
        const d = selectedDay.format('D')
        let startDay = Object.assign({}, selectedDay);
        startDay = moment(selectedDay).startOf('isoWeek')
        this.onSelectDayChange(d)
        this.setState({
            dateContext : selectedDay,
            startDayOfWeek : startDay
        })
    }

    getStartDayOfWeek = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).startOf('isoWeek')
        return {
            dateContext
        }
    }

    calendarItem = () => {
        /*const calendarList = [];
        calendarList.push(
            <Menu.Item  align = 'center' key= 'navigation'>
                <Grid columns = 'equal' >
                        <Grid.Column verticalAlign = 'middle' style = {{paddingLeft : '0', paddingRight : '0'}}> <this.monthNav/></Grid.Column>
                        <Grid.Column verticalAlign = 'middle' style = {{paddingLeft : '0', paddingRight : '0'}}> <this.yearNav/></Grid.Column>
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
                            this.moveToDiaryPage()
                            }}>
                          {this.month()}  {d}
                        </Menu.Item>
                        </Grid.Column>
                        <Grid.Column verticalAlign = 'middle' style = {{marginLeft : '0', paddingLeft : '0', passingRight : '0'}}>
                        <Button align = 'center' id = 'tag_create' size = 'mini' onClick = {() => this.props.history.push("/diary/create")} >+</Button>
                        </Grid.Column>

                    </Grid>
                </Menu.Item>
                
            )
        }*/
        const calendarList = [];
        const ExampleCustomInput = ({ value, onClick }) => (
            <Button align = 'center' color = 'blue' className="example-custom-input" onClick={onClick}>
              {value}
            </Button>
          );
        /*calendarList.push(
            <Menu.Item  align = 'center' key= 'navigation'>
                <Grid columns = 'equal' >
                        <Grid.Column verticalAlign = 'middle' style = {{paddingLeft : '0', paddingRight : '0'}}> <this.monthNav/></Grid.Column>
                        <Grid.Column verticalAlign = 'middle' style = {{paddingLeft : '0', paddingRight : '0'}}> <this.yearNav/></Grid.Column>
                </Grid>
            </Menu.Item>
      
        )*/
        calendarList.push(

            <div align = 'left' style = {{padding : '10', zIndex : '9999' }}>
            <DatePicker
            id = "datepicker"
            selected = {this.state.dateContext.toDate()}
            onChange = {this.handleChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode = 'select'
            todayButton = "TODAY"
            customInput={<ExampleCustomInput />}
        /></div>
        
        )
        var day = this.state.startDayOfWeek
        for(let d = 1; d <= 7; d++){
            let className = (this.currentDay() == day.format('D') ? "current_day" : "day");
            let D = day.format('D')
            calendarList.push(
                <Menu.Item style = {{padding :'10'}} key = {day.format("MMM") + '_' + day.format("D") }
                name = {day.format("MM") + '' + day.format("D") }
                active = {className === 'current_day'}
                >
                    <Grid columns = 'equal'  >
                        <Grid.Column width = {14} style = {{marginLeft : '0', padding : '0'}}>
                        <Menu.Item fitted='horizontally'
                        style = {{color : (d == '7' ? 'red' : d == '6' ? 'blue' : 'black')}}
                        id = {'day_' + String(d)}
                        onClick={() => {
                            this.onSelectDayChange(D)
                            this.moveToDiaryPage()
                            }}>
                        {day.format("MMM")}  {day.format('D')} ({day.format("ddd")})
                        </Menu.Item>
                        </Grid.Column>
                        <Grid.Column verticalAlign = 'middle' style = {{marginLeft : '0', paddingLeft : '0', passingRight : '0'}}>
                        <Button basic align = 'center' id = 'tag_create' size = 'mini' onClick = {() => this.props.history.push("/diary/create")} icon='plus' />
                        </Grid.Column>

                    </Grid>
                </Menu.Item>
                
            )
            day = day.clone().add(1, 'd');
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

    gardenCategoryItem = () => {
        const gardenCategoryItems = [];
        for(let i = 0; i<this.state.categories.length; i++){
            let tmpCategory = this.state.categories[i];
            gardenCategoryItems.push(
                <Dropdown.Item
                style ={{width : '270px'}} 
                onClick = { () => {
                    this.onSelectGardenCategory(tmpCategory);
                }}
                >{tmpCategory}</Dropdown.Item>
            )
        }
        return gardenCategoryItems;
    }

    calendarModeItem = () => {
        const calendarMode = [];
        calendarMode.push(
            <Container
            style={{
              position: "fixed",
              display: "flex",
              flexDirection: "column",
              top: 80, //it should be height of header
              bottom: 0,
              width: 265,
              background: "#FFFFFF",
              overflowX: "hidden",
              flex: 1
            }}
            >
              <Container  style = {{overflowY : "hidden"}}>
              <Menu vertical compact fluid size = 'huge'>
                <Menu.Item >
                <Grid columns = 'equal' divided >
                        <Grid.Row >
                            <Button.Group id = 'tag' basic widths = '3'  >
                            <Button id = 'tag_calendar' active = {this.state.mode === 'CALENDAR'} align = 'center' onClick = {()=>this.modeChange("CALENDAR")}>CAL</Button>
                            <Button id = 'tag_person' active = {this.state.mode === 'PERSON'} align = 'center' onClick = {()=>this.modeChange("PERSON")}>PEO</Button>
                            <Button id = 'tag_category' active = {this.state.mode === 'CATEGORY'} align = 'center' onClick = {()=>this.modeChange("CATEGORY")}>CAT</Button>
                            </Button.Group>
                        </Grid.Row>
              </Grid>
                </Menu.Item>
                <Menu.Item>
                    <Container className="sidabar" style={{flex: 1, overflowY : "auto", height : '700px'}}>
                    {
                        this.state.mode === "PERSON" ? <this.personItem/>
                        : this.state.mode === "CATEGORY" ? <this.categoryItem/> 
                        : <this.calendarItem/>
                    }
                </Container>
                </Menu.Item>

            </Menu></Container>;
              
          </Container>
        )

        return calendarMode;
    }

    gardenModeItem = () => {
        const gardenMode = [];
        gardenMode.push(
            <Container
            style={{
              position: "fixed",
              display: "flex",
              flexDirection: "column",
              top: 80, //it should be height of header
              bottom: 0,
              width: 265,
              background: "#FFFFFF",
              overflowX: "hidden",
              flex: 1
            }}
            >
                <Menu.Item>
                <Container className="sidabar">
                <Menu fluid vertical size = 'huge'>
                <Menu.Item
                    name='ALL'
                    active = {this.state.gardenMode === 'ALL'}
                    onClick={ () => {
                        this.onSelectGardenModeChange('ALL')}}
                />
                
                
                <Menu.Item
                    name='MY FLOWER'
                    active = {this.state.gardenMode === 'MYFLOWER'}
                    onClick={ () => {
                        this.onSelectGardenModeChange('MYFLOWER')}}
                />
                <Menu.Item
                    name='MY GARDEN'
                    active = {this.state.gardenMode === 'MYGARDEN'}
                    onClick={ () => {
                        this.onSelectGardenModeChange('MYGARDEN')}}
                />
                <Menu.Item>
                <Dropdown text='CATEGORY' align = 'left' fluid floating
                    >
                    <Dropdown.Menu align = 'left'>
                        <this.gardenCategoryItem/>
                    </Dropdown.Menu>
                </Dropdown>
                </Menu.Item>
        
            </Menu>
                    </Container>
                </Menu.Item>              
          </Container>
        )

        return gardenMode;
    }

    render() {
        return (
            this.props.history.location.pathname === ('/garden') ? <this.gardenModeItem/> : <this.calendarModeItem/>         
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(sidebar));