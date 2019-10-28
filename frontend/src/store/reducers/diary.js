import * as actionTypes from '../actions/actionTypes';

const initialstate={
    diaries : [],
    gardendiaries : [],
    selectedDiary : [{'id' : 1, 'author' : diary.author.id, 'content' : diary.content, 'category_name' : diary.category.name, 'person_tag' : diary.people.all(),
    'category_title':diary.category.category_title, 'rating':diary.category.rating, 'emotion_score' : diary.emotion_score }],
};

const reducer = (state = initialstate, action) => {
    switch(action.type){
        case actionTypes.GET_DIARY_BY_DATE:
            return{...state, selectedDiary : action.diaries};

        case actionTypes.GET_DIARY_BY_PERSON:
            return{...state, selectedDiary : action.diaries};

        case actionTypes.DELETE_DIARY:
            const deleted = state.diaries.filter((diary)=> {
                return diary.id != action.targetID;
            }); 
            return {...state, diaries : deleted};   
        case actionTypes.SHARE_DIARY : 
        const newGardenDiary = {
            ////////
        }
            return {...state, gardendiaries : state.gardendiaries.concat(newGardenDiary)};
    }
    return state;
};

export default reducer;
