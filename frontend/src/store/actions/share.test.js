import axios from 'axios';

import * as actionCreators from './share'
import store from '../store';

const stubDiaryList= [{
    'author': 1,
    'content': 'Do. Or do not. There is no try.',
    'categoryName': 'MOVIE', 
    'categoryTitle': 'Star Wars',
    'emotionScore' : 0,
    'people' : [],
    'rating': 5,
    'created_date': null,
    'modified_date': null

}];

describe('share', () => {
    afterEach(() => {jest.clearAllMocks()});

    it('post gardendiary',(done) => {
    const spy = jest.spyOn(axios, 'post')
    .mockImplementation(url => {
        return new Promise((resolve, reject) => {
            const result = {
                status : 201 , data : stubDiaryList[0]
            };
            resolve(result);
        })
    });

    store.dispatch(actionCreators.shareDiary())
    .then(()=>{
        const newState = store.getState();
        expect(newState.diary.garden_list.length).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });
    
    });

    it('post fail gardendiary',(done) => {
        const spy = jest.spyOn(axios, 'post')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    response : {
                        status : 400 
                    }
                };
                reject(result);
            })
        });
    
        store.dispatch(actionCreators.shareDiary())
        .then(()=>{
            const newState = store.getState();
            expect(newState.diary.garden_list.length).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
        
        });
})