import axios from 'axios';

import * as actionCreators from './previousdiary'
import store from '../store';

const stubSelectedDiary = {
    'author': 1,
    'content': 'Do. Or do not. There is no try.',
    'categoryName': 'MOVIE', 
    'categoryTitle': 'Star Wars',
    'emotionScore' : 0,
    'people' : [],
    'rating': 5,
    'created_date': null,
    'modified_date': null

};

describe('get previousdiary', () => {
    afterEach(() => {jest.clearAllMocks()});

    it('getDiaryByDate',(done) => {
    const spy = jest.spyOn(axios, 'get')
    .mockImplementation(url => {
        return new Promise((resolve, reject) => {
            const result = {
                status : 200 , data : stubSelectedDiary
            };
            resolve(result);
        })
    });

    store.dispatch(actionCreators.getDiaryByDate())
    .then(()=>{
        const newState = store.getState();
        expect(newState.diary.selectedDiary).toBe(stubSelectedDiary);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });
    
    });

    it('getDiaryByPerson',(done) => {
        const mySpy = jest.spyOn(axios, 'get')
        .mockImplementation(() => {
            return new Promise((resolve) => {
                const result = {
                    status : 200 , data : stubSelectedDiary
                };
                resolve(result);
            })
        });
    
        store.dispatch(actionCreators.getDiaryByPerson())
        .then(()=>{
            const newState = store.getState();
            expect(newState.diary.selectedDiary).toBe(stubSelectedDiary);
            expect(mySpy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('getDiaryByCategory',(done) => {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(()=> {
            return new Promise((resolve) => {
                const result = {
                    status : 200 , data : stubSelectedDiary
                };
                resolve(result);
            })
        });
    
        store.dispatch(actionCreators.getDiaryByCategory())
        .then(()=>{
            const newState = store.getState();
            expect(newState.diary.selectedDiary).toBe(stubSelectedDiary);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
})
