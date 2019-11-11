import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getDiaryByDate_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_DATE, diaries : diaries};
};

export const getDiaryByDate = (year,month,day) => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/api/diary/date/' + year+'/'+month+'/'+ day+'/')
        .then(res => {dispatch(getDiaryByDate_(res.data));
        });
    };
};

export const getDiaryByPerson_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_PERSON, diaries : diaries};
};

export const getDiaryByPerson = (id) => {
<<<<<<< HEAD
=======
    console.log(id);
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
    return (dispatch) => {
        return axios.get('http://localhost:8000/api/diary/person/' + id+'/')
        .then(res => {dispatch(getDiaryByPerson_(res.data));
        });
    };
};

export const getDiaryByCategory_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_CATEGORY, diaries : diaries};
};

export const getDiaryByCategory = (name) => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/api/diary/category/' + name+'/')
        .then(res => {dispatch(getDiaryByCategory_(res.data));
        });
    };
};


