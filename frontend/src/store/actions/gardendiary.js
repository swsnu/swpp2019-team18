import axios from 'axios';
import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';


export const getAllGardenDiary_ = (diaries) => {
    return{
        type : actionTypes.GET_ALL_GARDEN_DIARY,
        diaries : diaries,
    };
};

export const getAllGardenDiary = (mode) => {
    return (dispatch) => {
        return axios.get('/api/garden/'+mode+'/')
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
        return axios.post('/api/garden/flower/'+id+'/')
        .then((res) => {dispatch(giveFlower_(id, res.data))})
    };
};

export const getGardenDiaryByCategory_ = (diaries) => {
    return {type : actionTypes.GET_GARDEN_DIARY_BY_CATEGORY, diaries : diaries};

}

export const getGardenDiaryByCategory = (name, mode) => {
    return (dispatch) => {
        return axios.get('/api/garden/category/' + name+'/'+mode+'/')
        .then(res => {dispatch(getGardenDiaryByCategory_(res.data));
        });
    };
}

export const getMyGardenDiary_ = (diaries) => {
    return{type : actionTypes.GET_MY_GARDEN_DIARY, diaries : diaries};
}

export const getMyGardenDiary = (mode) => {
    return(dispatch) => {
        return axios.get('/api/garden/mylist/'+mode+'/')
        .then(res => {dispatch(getMyGardenDiary_(res.data));
        });
    }
}

export const deleteGardenDiary_ = (id) => {
    return{type : actionTypes.DELETE_GARDEN_DIARY, targetID : id};
}

export const deleteGardenDiary = (id) => {
    return(dispatch) => {
        return axios.delete('/api/garden/mylist/'+id+'/')
        .then( () => {dispatch(deleteGardenDiary_(id));
        });
    }
}