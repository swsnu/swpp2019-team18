import axios from 'axios';

import * as actionCreators from './gardendiary'
import store from '../store';

const stubSelectedGarden = [{
    id: 1,
    category_name: "MOVIE",
    category_title: "title",
    content: "content",
    flower_count: 1,
    flower_users: [{user : "user1"}],
    shared_date: "2019-12-25"

}];

let stubGarden_dist = [];

describe('gardendiary', () => {

    afterEach(() => {jest.clearAllMocks()});

    it('getAllGardenDiary',(done) => {
    const spy = jest.spyOn(axios, 'get')
    .mockImplementation(url => {
        return new Promise((resolve, reject) => {
            const result = {
                status : 200 , data : stubSelectedGarden
            };
            resolve(result);
        })
    });

    store.dispatch(actionCreators.getAllGardenDiary())
    .then(()=>{
        const newState = store.getState();
        expect(newState.garden.garden_diary).toBe(stubSelectedGarden);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });
});

    it('getAllGardenDiary',(done) => {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status : 200 , data : stubSelectedGarden
                };
                resolve(result);
            })
        });
    store.dispatch(actionCreators.getGardenDiaryByCategory())
    .then(()=>{
        const newState = store.getState();
        expect(newState.garden.garden_diary).toBe(stubSelectedGarden);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });

});

it('getAllGardenDiary',(done) => {
    const spy = jest.spyOn(axios, 'get')
    .mockImplementation(url => {
        return new Promise((resolve, reject) => {
            const result = {
                status : 200 , data : stubSelectedGarden
            };
            resolve(result);
        })
    });
    store.dispatch(actionCreators.getMyGardenDiary())
    .then(()=>{
        const newState = store.getState();
        expect(newState.garden.garden_diary).toBe(stubSelectedGarden);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });
})

it('getAllGardenDiary',(done) => {
    const spy = jest.spyOn(axios, 'get')
    .mockImplementation(url => {
        return new Promise((resolve, reject) => {
            const result = {
                status : 200 , data : stubSelectedGarden
            };
            resolve(result);
        })
    });
    store.dispatch(actionCreators.getMyFlower())
    .then(()=>{
        const newState = store.getState();
        expect(newState.garden.garden_diary).toBe(stubSelectedGarden);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });
    
    });

    it('giveflower',(done) => {
        const spy = jest.spyOn(axios, 'post')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status : 200 , id : 1, data : stubSelectedGarden
                };
                resolve(result);
            })
        });
        const newState = store.getState();
        console.log(newState);
        store.dispatch(actionCreators.giveFlower())
        .then(()=>{
            expect(newState.garden.garden_diary).toBe(stubSelectedGarden);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    })

    it('delete garden diary', (done) => {
        const spy = jest.spyOn(axios, 'delete')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status : 200 , data : null
                };
                resolve(result);
            });
        })
            
        store.dispatch(actionCreators.deleteGardenDiary(1))
        .then( () => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        
        });
    });

    
})
