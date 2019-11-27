import * as actionTypes from './actionTypes';
import axios from 'axios'

const getCategory_ = (categories) => {
    return {
        type : actionTypes.GET_CATEGORY,
        data : categories,
    };
}

export const getCategory = () => {
    return dispatch => {
        return axios.get('/api/diary/category/')
               .then(res => dispatch(getCategory_(res.data)))
    }
}

const getStatCal_ = (items) => {
    return {
        type : actionTypes.GET_STATCAL,
        data : items,
    }
}

export const getStatCal = () => {
    return dispatch => {
        return axios.get('/api/diary/calendarOption/')
                    .then(res => dispatch(getStatCal_(res.data)));
    }
}

const getStatistics_ = (data) => {
    return {
        type : actionTypes.GET_STATISTICS,
        graph_data : data,
    }
}

export const getStatistics = (queryObj) => {
    return dispatch => {
        return axios.get('/api/diary/statistics/', {params : queryObj})
                    .then(res => dispatch(getStatistics_(res.data)));
    }
}