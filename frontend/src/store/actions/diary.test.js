import React from 'react';
import * as actionCreators from "./diary";
import * as actionTypes from "./actionTypes";
import axios from 'axios';

let stubDiary = {
    content : "제다이",
    categoryName : "MOVIE",
    categoryTitle : "스타워즈",
    people : [{key : 1, name : "윤수"}],
    rating : 0,
    emotionScore : 0,
};

let stubPeople = []

axios.get = jest.fn((url) => {
    return new Promise((resolve, reject) => {
        if(url === "http://localhost:8000/api/diary/1/"){
            resolve({data : stubDiary });
        }
        else if(url === "http://localhost:8000/api/diary/people/"){
            resolve({data: stubPeople});
        }
        else{
            resolve({data : "bye"});
        }
    })
});

axios.put = jest.fn((url, obj) => {
    return new Promise((resolve, reject) => {
        const res = {data : stubDiary};
        resolve(res);
    })
});

axios.post = jest.fn((x, y) => {
    return new Promise((resolve, reject) => {
        resolve({data : stubDiary});
    })
});

axios.delete = jest.fn((id) => {
    return new Promise((resolve, reject) => {
        resolve({data : stubDiary});
        
    })
});

describe("actionCreators", () => {
    let fn;
    const nullFun = () => {};
    it("should call actionCreators.getDiary", () => {
        fn = actionCreators.getDiary(1);
        fn(nullFun);
        
    })

    it("should call actionCreators.addDiary", () => {
        fn = actionCreators.addDiary(stubDiary);
        fn(nullFun);
    })

    it("should call actionCreators.editDiary", () => {
        fn = actionCreators.editDiary(1, stubDiary);
        fn(nullFun);
    })

    it("should call actionCreators.getPeople", () => {
        fn = actionCreators.getPeople();
        fn(nullFun);
    })

    it("should call actionCreators.deleteDiary", () => {
        fn = actionCreators.deleteDiary(1);
        fn(nullFun);
    })
});
