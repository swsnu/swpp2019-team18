import React, { Component } from 'react';
import NewDiary from '../diaryWrite/newDiary'

class EditDiary extends Component {
<<<<<<< HEAD
=======
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        people : [],
        rating : null,
        emotionScore : 0,
        buttons : [false, false, false, false],
        nameInput: "",
        allPeople: [],
    }

    handleToggle = (e, btnId, name) => {
        let updateButtons = this.state.buttons.slice();
        updateButtons[btnId] = !updateButtons[btnId]
        if(updateButtons[btnId]){
            updateButtons = updateButtons.map(val => false);
            updateButtons[btnId] = true;
        }
        this.setState({buttons : updateButtons, categoryName: name});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allPeople !== undefined && nextProps.allPeople.length > 0 && prevState.allPeople !== nextProps.allPeople ){
            return {...prevState, allPeople : nextProps.allPeople};
        }
        return prevState;
    }

    componentDidMount(){
        this.props.getDiary(this.props.match.params.id);
        this.props.getPeople();
    }

    setButtons(categoryName) {
        let updatedButtons = this.state.buttons.slice();
        switch(categoryName){
            case "MOVIE":
                updatedButtons[0] = true;
                this.setState({buttons : updatedButtons});
                break;
            case "PEOPLE":
                updatedButtons[1] = true;
                this.setState({buttons : updatedButtons});
                break;
            case "DATE":
                updatedButtons[2] = true;
                this.setState({buttons : updatedButtons});
                break;
            case "TRAVEL":
                updatedButtons[3] = true;
                this.setState({buttons : updatedButtons});
                break;
            default:
                return ;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.diary !== prevProps.diary) {
            this.setState({
                content : this.props.diary.content,
                categoryName : this.props.diary.categoryName,
                categoryTitle : this.props.diary.categoryTitle,
                people : this.props.diary.people,
                rating : this.props.diary.rating,
                emotionScore : this.props.diary.emotionScore,
            })
            this.setButtons(this.props.diary.categoryName);
        }
      }

    handleChange = (e, { value })=> {
        this.setState({people : value});
    }

    submitHandler = () => {
        const diaryObj = this.state;
        this.props.editDiary(this.props.match.params.id, diaryObj);

        this.props.history.push('/diary');
        //this.props.history.push('/diary');
    }

>>>>>>> calendar
    render() {
        return <NewDiary EditMode = {true}/>
    }
}

export default EditDiary;