import * as actionTypes from '../actions/actionTypes'

const initialState = {
    diary_list : [],
    diary : {
        'author': 1,
        'content': 'Do. Or do not. There is no try.',
        'categoryName': 'MOVIE', 
        'categoryTitle': 'Star Wars',
        'emotionScore' : 0,
        'people' : [],
        'rating': 5,
        'created_date': null,
        'modified_date': null
    },
    garden_list : [],
    selectedDiary : [],
    mode : 'CALENDAR',
    year : '2019',
    month : '11',
    day : '4'
}

const reducer = (state=initialState, action) => {
    console.log("Reducer " + action.type);
    switch(action.type) {
        case actionTypes.GET_DIARY :
            console.log(action.diary)
            return {...state, diary: action.diary};
        case actionTypes.ADD_DIARY :
            return {...state, diary : action.diary};
        case actionTypes.EDIT_DIARY : 
            console.log(action.diary)
            return {...state, diary : action.diary};
        case actionTypes.SET_MODE :
            return {...state, mode : action.mode};
        case actionTypes.SET_YEAR :
            return {...state, year : action.year};
        case actionTypes.SET_MONTH :
            return {...state, month : action.month};
        case actionTypes.SET_DAY :
            return {...state, day : action.day};
        default:
            return {...state};
    }
}
export default reducer;