import * as actionTypes from '../actions/actionTypes'


const initialState = {
    garden_diary : [],

    gardenmode : 'MYFLOWER',        //ALL or CATEGORY or MYGARDEN or MYFLOWER
    category_name : 'PEOPLE',
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_GARDEN_DIARY:
            return {...state, garden_diary : action.diaries};
        case actionTypes.GIVE_FLOWER:
            const modified_diary = state.garden_diary.map((diary)=> {
                if(diary.id === action.target){
                    return action.change;
                } else{
                    return{...diary};
                }
            });
            return {...state, garden_diary : modified_diary };
        case actionTypes.GET_GARDEN_DIARY_BY_CATEGORY:
            return {...state, garden_diary : action.diaries};
        case actionTypes.GET_MY_GARDEN_DIARY:
            return {...state, garden_diary : action.diaries};
        case actionTypes.GET_MY_FLOWER:
            return {...state, garden_diary : action.diaries};

        case actionTypes.DELETE_GARDEN_DIARY:
            const deleted = state.garden_diary.filter((diary)=> {
            return diary.id !== action.targetID;
        }); 
            return {...state, garden_diary : deleted};   
        default:
            return {...state};
    }
}

export default reducer;