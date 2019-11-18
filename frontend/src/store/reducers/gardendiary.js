import * as actionTypes from '../actions/actionTypes'


const initialState = {
    garden_diary : [],

    gardenmode : 'CATEGORY',        //ALL or CATEGORY
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
        case actionTypes.SET_GARDEN_MODE2 :
            return {...state, gardenmode2 : action.mode}; 

        default:
            return {...state};
    }
}

export default reducer;