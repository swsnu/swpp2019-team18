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

    it('set Day', () => {
        store.dispatch(actionCreators.setDay('27'))
        const newState = store.getState();
        expect(newState.diary.day).toBe('27');
    });
})
