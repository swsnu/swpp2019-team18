import * as actionTypes from '../actions/actionTypes'


const initialState = {
    garden_diary : [
    //     {
    //     'content' : 'test garden diary',
    //     'category_name' : 'MOVIE',
    //     'category_name' : 'test movie title',
    //     'flower_count' : 5,
    // }
],

    peopleIds: [],
    peopleNames: [],
    selectedDiary : [],
    gardenmode : 'ALL',        //ALL or CATEGORY
    gardenmode2 : 'Latest',     //LATEST or POPULAR
    category_name : 'MOVIE',
    person_id : '',
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
        case actionTypes.SET_GARDEN_MODE2 :
            return {...state, gardenmode2 : action.mode}; 

        default:
            return {...state};
    }
}

export default reducer;