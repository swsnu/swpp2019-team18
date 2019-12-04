import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getDiaryByDate_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_DATE, diaries : diaries};
};

export const getDiaryByDate = (year,month,day) => {
    return (dispatch) => {
        return axios.get('/api/diary/date/' + year+'/'+month+'/'+ day+'/')
        .then(res => {dispatch(getDiaryByDate_(res.data));
        });
    };
};

export const getDiaryByPerson_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_PERSON, diaries : diaries};
};

export const getDiaryByPerson = (id) => {
    return (dispatch) => {
        return axios.get('/api/diary/person/' + id+'/')
        .then(res => {dispatch(getDiaryByPerson_(res.data));
        });
    };
};

export const getDiaryByCategory_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_CATEGORY, diaries : diaries};
};

export const getDiaryByCategory = (name) => {
    return (dispatch) => {
        return axios.get('/api/diary/category/' + name+'/')
        .then(res => {dispatch(getDiaryByCategory_(res.data));
        });
    };
};


