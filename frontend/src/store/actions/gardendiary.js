import axios from 'axios';
import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';

export const getAllGardenDiary_ = (diaries) => {
    return{
        type : actionTypes.GET_ALL_GARDEN_DIARY,
        diaries : diaries,
    };
};

export const getAllGardenDiary = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/api/garden/')
        .then((res) => {dispatch(getAllGardenDiary_(res.data))})
    };
};

export const giveFlower_ = (id, flower_count) => {
    return{
        type : actionTypes.GIVE_FLOWER,
        target : id,
        flower_count : flower_count
    };
};

export const giveFlower = (id) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/api/garden/flower/'+id+'/')
        .then((res) => {dispatch(giveFlower_(id, res.data))})
    };
};

