
import * as actionTypes from '../actions/actionTypes';

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
    mode : 'CATEGORY'           //'CALENDAR' or 'PERSON' or 'CATEGORY' 
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_DIARY :
            return {...state, diary: action.diary};
        case actionTypes.ADD_DIARY :
            return {...state, diary : action.diary};
        case actionTypes.EDIT_DIARY : 
            return {...state, diary : action.diary};
        
        case actionTypes.GET_DIARY_BY_DATE:
            return{...state, selectedDiary : action.diaries};
        
        case actionTypes.GET_DIARY_BY_PERSON:
            return{...state, selectedDiary : action.diaries};            
        case actionTypes.GET_DIARY_BY_CATEGORY:
            return{...state, selectedDiary : action.diaries};
        
        case actionTypes.DELETE_DIARY:
            const deleted = state.diary_list.filter((diary)=> {
                return diary.id !== action.targetID;
            }); 
            const selectdeleted = state.selectedDiary.filter((diary)=> {
                return diary.id !== action.targetID;
            }); 
            return {...state, diary_list : deleted, selectedDiary : selectdeleted};   
        case actionTypes.SHARE_DIARY : 
            const newGardenDiary = {
                    id : action.id,
                    author : action.user,
                    origin_diary : action.origin_diary,
                    content : action.content,
                    category : action.category,
                    flower_users : action.flower_users,
                    shared_date : action.shared_date
                }
            return {...state, garden_list : state.garden_list.concat(newGardenDiary)};
        default:
            return {...state};
    }
}
export default reducer;
