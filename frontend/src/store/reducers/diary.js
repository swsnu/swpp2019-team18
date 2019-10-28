import * as actionTypes from '../actions/actionTypes';

const initialstate={
    diaries : [],
    gardendiaries : [],
    selectedDiary : [],
    mode : 'CALENDAR'
};

const reducer = (state = initialstate, action) => {
    switch(action.type){
        case actionTypes.GET_DIARY_BY_DATE:
            return{...state, selectedDiary : action.diaries};

        case actionTypes.GET_DIARY_BY_PERSON:
            return{...state, selectedDiary : action.diaries};
        
        case actionTypes.GET_DIARY_BY_CATEGORY:
                return{...state, selectedDiary : action.diaries};

        case actionTypes.DELETE_DIARY:
            const deleted = state.diaries.filter((diary)=> {
                return diary.id != action.targetID;
            }); 
            return {...state, diaries : deleted};   
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
            return {...state, gardendiaries : state.gardendiaries.concat(newGardenDiary)};
    }
    return state;
};

export default reducer;
