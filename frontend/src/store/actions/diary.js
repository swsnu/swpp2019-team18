import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const getDiaryByDate_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_DATE, diaries : diaries};
};

export const getDiaryByDate = (year,month,day) => {
    return (dispatch) => {
        console.log(date)
        return axios.get('http://localhost:8000/api/diary/date/' + year+'/'+month+'/'+ day+'/')
        .then(res => {dispatch(getDiaryByDate_(res.data));
        });
    };
};

export const getDiaryByPerson_ = (diaries) => {
    return {type : actionTypes.GET_DIARY_BY_PERSON, diaries : diaries};
};

export const getDiaryByPerson = (id) => {
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
        return axios.get('http://localhost:8000/api/diary/Category/' + name+'/')
        .then(res => {dispatch(getDiaryByCategory_(res.data));
        });
    };
};

export const deleteDiary_ = (id) => {
    return{
        type : actionTypes.DELETE_DIARY,
        targetID : id
    };
};

export const deleteDiary = (id) => {
    return (dispatch) => {
        return axios.delete('http://localhost:8000/api/diary/'+id)
        .then(() => {dispatch(deleteDiary_(id))})
    };
};

export const shareDiary_ = (diary) => {
    return{
        type : actionTypes.SHARE_DIARY,
        author : diary.user,
        origin_diary : diary.origin_diary,
        content : diary.content,
        category : diary.category,
        flower_users : diary.flower_users,
        shared_date : diary.shared_date
    };
};


export const shareDiary = (id, content) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/api/diary/share/'+id+'/', content)
        .then(res => dispatch(shareDiary_(res)))

    };
}