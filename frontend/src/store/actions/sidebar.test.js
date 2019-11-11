import sidebar,* as actionCreators from './sidabar'
import store from '../store';

describe('sidebar', () => {
    const state = store.getState();
    it('should return the initialState', () =>{
        expect(state.diary.mode).toBe('CALENDAR');
    })

    it('set Mode', () => {
        store.dispatch(actionCreators.setMode('PERSON'))
        const newState = store.getState();
        expect(newState.diary.mode).toBe('PERSON');
    });

    it('set Year', () => {
        store.dispatch(actionCreators.setYear('2012'))
        const newState = store.getState();
        expect(newState.diary.year).toBe('2012');
    });

    it('set Month', () => {
        store.dispatch(actionCreators.setMonth('12'))
        const newState = store.getState();
        expect(newState.diary.month).toBe('12');
    });

    it('set Category', () => {
        store.dispatch(actionCreators.setCategory('DATE'))
        const newState = store.getState();
        expect(newState.diary.category_name).toBe('DATE');
    });

    it('set Person', () => {
        store.dispatch(actionCreators.setPersonId('7'))
        const newState = store.getState();
        expect(newState.diary.person_id).toBe('7');
    });

    
    it('set Day', () => {
        store.dispatch(actionCreators.setDay('27'))
        const newState = store.getState();
        expect(newState.diary.day).toBe('27');
    });
})
