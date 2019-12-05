import * as actionTypes from './actionTypes';
import axios from 'axios'

const getCategoryStatistics = (data) => {
    return {
        type : actionTypes.GET_CATEGORY_STATISTICS,
        graph_data : data,
    }
}

const getCalendarStatistics = (data) => {
    return {
        type : actionTypes.GET_CALENDAR_STATISTICS,
        graph_data : data,
    }
}

const getPeopleStatistics = (data) => {
    return {
        type : actionTypes.GET_PEOPLE_STATISTICS,
        graph_data : data,
    }
}

const getCategoryFrequency_ = (data) => {
    return {
        type : actionTypes.GET_CATEGORY_FREQ_STATISTICS,
        graph_data : data,
    }
}

export const getCategoryFrequency = () => {
    return dispatch => {
        return axios.get('/api/diary/frequency/category/')
            .then(res => dispatch(getCategoryFrequency_(res.data)))
    }
}

export const getStatistics = (queryObj) => {
    return dispatch => {
        return axios.get('/api/diary/statistics/', {params : queryObj})
            .then(res => {
                if(queryObj.mode === "CALENDAR"){
                    return dispatch(getCalendarStatistics(res.data));
                }
                else if (queryObj.mode === "CATEGORY"){
                    return dispatch(getCategoryStatistics(res.data));
                }
                else{
                    return dispatch(getPeopleStatistics(res.data));
                }
            }
        );
    }
}