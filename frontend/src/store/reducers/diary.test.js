import React from 'react';
import DiaryReducer from "./diary";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    diary_list : [],
    diary : {
        'author': 1,
        'content': 'Do. Or do not. There is no try.',
        'categoryName': 'MOVIE', 
        'categoryTitle': 'Star Wars',
        'emotionScore' : 0,
        'people' : [],
        'rating': 5,
        'created_date': null,
        'modified_date': null
    },
    peopleIds: [],
    peopleNames: [],
    garden_list : [],
    selectedDiary : [],
    mode : 'CATEGORY'           //'CALENDAR' or 'PERSON' or 'CATEGORY' 
}

let diary = {
    content : "제다이",
    categoryName : "MOVIE",
    categoryTitle : "스타워즈",
    people : [{key : 1, name : "윤수"}],
    rating : 0,
    emotionScore : 0,
};
const defaultAction = {diary:diary, selectedDiary: diary, targetID : 1, 
                        allPeople: []};
                        
const shareAction = {
    id : 1,
    author : 1,
    origin_diary : diary,
    content : diary.content, 
    category : 1,
    flower_users : 1,
    shared_date : "2019/7/14",
}

describe("Article Reducer", () => {
    it("should call actionTypes.GET_DIARY", () => {
        const action = {type: actionTypes.GET_DIARY};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })

    it("should call actionTypes.ADD_DIARY", () => {
        const action = {type: actionTypes.ADD_DIARY};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })

    it("should call EDIT_DIARY", () => {
        const action = {type: actionTypes.EDIT_DIARY};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(undefined, newAction);
    })

    it("should call actionTypes.GET_DIARY_BY_DATE", () => {
        const action = {type: actionTypes.GET_DIARY_BY_DATE};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })

    it("should call actionTypes.GET_DIARY_BY_PERSON", () => {
        const action = {type: actionTypes.GET_DIARY_BY_PERSON};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })


    it("should call actionTypes.GET_DIARY_BY_CATEGORY", () => {
        const action = {type: actionTypes.GET_DIARY_BY_CATEGORY};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })


    it("should call actionTypes.DELETE_DIARY", () => {
        const action = {type: actionTypes.DELETE_DIARY};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })


    it("should call actionTypes.SHARE_DIARY", () => {
        const action = {type: actionTypes.SHARE_DIARY};
        const newAction = Object.assign({}, action, shareAction);
        DiaryReducer(initialState, newAction);
    })


    it("should call actionTypes.EDIT_COMMENT", () => {
        const action = {type: actionTypes.EDIT_COMMENT};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })

    it("should call actionTypes.SEARCH_PEOPLE", () => {
        const action = {type: actionTypes.SEARCH_PEOPLE};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })

    it("should call actionTypes.ADD_PEOPLE", () => {
        const action = {type: actionTypes.ADD_PEOPLE};
        const newAction = Object.assign({}, action, defaultAction);
        DiaryReducer(initialState, newAction);
    })
    
    it("should call default", () => {
        const action = {type: "None Type"};
        DiaryReducer(undefined, action);
    })
});
