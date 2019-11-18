import axios from 'axios';
import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';

export const setGardenMode2 = (mode) => {
    return {
    type : actionTypes.SET_GARDEN_MODE2,
    mode : mode
    }
} 

export const getAllGardenDiary_ = (diaries) => {
    return{
        type : actionTypes.GET_ALL_GARDEN_DIARY,
        diaries : diaries,
    };
};

export const getAllGardenDiary = (mode) => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/api/garden/'+mode+'/')
        .then((res) => {dispatch(getAllGardenDiary_(res.data))})
    };
};

export const giveFlower_ = (id, change) => {
    return{
        type : actionTypes.GIVE_FLOWER,
        target : id,
        change : change
    };
};

export const giveFlower = (id) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/api/garden/flower/'+id+'/')
        .then((res) => {dispatch(giveFlower_(id, res.data))})
    };
};

export const getGardenDiaryByCategory_ = (diaries) => {
    return {type : actionTypes.GET_GARDEN_DIARY_BY_CATEGORY, diaries : diaries};

}

export const getGardenDiaryByCategory = (name, mode) => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/api/garden/category/' + name+'/'+mode+'/')
        .then(res => {dispatch(getGardenDiaryByCategory_(res.data));
        });
    };
}