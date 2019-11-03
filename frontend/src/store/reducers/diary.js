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
    peopleIds: [],
    peopleNames: [],
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_DIARY:
            return {...state, diary: action.diary};
        case actionTypes.ADD_DIARY:
            return {...state, diary: action.diary};
        case actionTypes.EDIT_DIARY: 
            return {...state, diary: action.diary};
        case actionTypes.SEARCH_PEOPLE:
            return {...state, allPeople: action.allPeople};
        case actionTypes.ADD_PEOPLE:
            return {...state};
        default:
            return {...state};
    }
}
export default reducer;