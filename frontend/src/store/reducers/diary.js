import * as actionTypes from '../actions/actionTypes'


const initialState = {
    diary_list : [],
    diary : {
    },
    peopleIds: [],
    peopleNames: [],
    garden_list : [],
    selectedDiary : [],
    mode : 'CALENDAR',
    year : '',
    month : '',
    day : '',
    category_name : '',
    person_id : '',
}


const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_DIARY :
            return {...state, diary: action.diary};
        case actionTypes.ADD_DIARY :
            return {...state, diary : action.diary};
        case actionTypes.EDIT_DIARY : 
            return {...state, diary : action.diary};

        case actionTypes.SET_MODE :
            return {...state, mode : action.mode};
        case actionTypes.SET_YEAR :
            return {...state, year : action.year};
        case actionTypes.SET_MONTH :
            return {...state, month : action.month};
        case actionTypes.SET_DAY :
            return {...state, day : action.day};
        case actionTypes.SET_CATEGORY :
            return {...state, category_name : action.category_name}
        case actionTypes.SET_PERSONID :
            return {...state, person_id : action.person_id};

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
        case actionTypes.SEARCH_PEOPLE:
            const items = action.allPeople.map((data) => data.name);
            return {...state, allPeople: action.allPeople, items : items};
        case actionTypes.ADD_PEOPLE:
            return {...state};
        case actionTypes.GET_CATEGORY:
            return {...state, items : action.data};
        case actionTypes.GET_STATCAL:
            return {...state, items : action.data};
        case actionTypes.GET_CATEGORY_STATISTICS:
            return {...state, categoryData : action.graph_data};
        case actionTypes.GET_CALENDAR_STATISTICS:
            return {...state, calendarData : action.graph_data};
        case actionTypes.GET_PEOPLE_STATISTICS:
            return {...state, friendData : action.graph_data};
        case actionTypes.GET_CATEGORY_FREQ_STATISTICS:
            return {...state, categoryFreqData : action.graph_data}
        default:
            return {...state};
    }
}

export default reducer;
