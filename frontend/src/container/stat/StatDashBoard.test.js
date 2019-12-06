import React from 'react'
import { history } from '../../store/store';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import StatDashBoard from './StatDashBoard';
import { getMockStore } from '../../test_utils/mocks';
import BaseAreaChart from '../../component/Stat/BaseAreaChart';
import BasePieChart from '../../component/Stat/PieChart';
import expectExport from 'expect';


const percent = 32;
const prev_mean = 10;
const cur_mean = 30;
const ele1 = {
        day : "11/12",
        cur_scores : [12], 
        cur_diary_ids: [2], 
        prev_scores : [32],
        prev_diary_ids : [3],
        cur_score : 12,
        prev_score : 32,
    }
const ele2 = {
        day : "11/12",
        cur_scores : [77], 
        cur_diary_ids: [2], 
        prev_scores : [88],
        prev_diary_ids : [3],
        cur_score : 77,
        prev_score : 88,
    }
const calendarData = {
    'graph_data' : [
        ele1, 
        ele2, 
        {...ele2, day : '12/1'}, 
        {...ele2, day : '12/2'}, 
        {...ele2, day : '12/3'}, 
        {...ele2, day : '10/5'},
        {...ele2, day : '10/6'},
        {...ele2, day : '10/7'},
        {...ele2, day : '10/8'},
    ], 
    'meta' : {percent : percent, prev_mean : prev_mean, cur_mean : cur_mean}
};


const categoryData = {
    'graph_data': [
        {'name': 'BOOK', 'score': 25}, 
        {'name': 'MOVIE', 'score': 40}, 
        {'name': 'EXERCISE', 'score': 37},
        {'name': 'ETC', 'score': 47},
        {'name': 'FRIEND', 'score': 57}
    ], 
    'meta': {'percent': 37, 'frequent_category': 'MOVIE'}
};

const friendData = {
    'graph_data': [
        {'friend_name': '민수', 'score': 35, 'tag_count': 3, 'friend_id': 1},
        {'friend_name': '윤수', 'score': 30, 'tag_count': 1, 'friend_id': 2},
        {'friend_name': '재호', 'score': 40, 'tag_count': 1, 'friend_id': 4},
        {'friend_name': '성호', 'score': 50, 'tag_count': 1, 'friend_id': 3},
        {'friend_name': '대호', 'score': 60, 'tag_count': 1, 'friend_id': 6},
    ], 
    'meta': {'best_friend': '민수'}
};

const categoryFreqData = {
    'graph_data': [
        {'category_name': 'MOVIE', 'value': 55, 'count': 4}, 
        {'category_name': 'BOOK', 'value': 35, 'count': 3}, 
        {'category_name': 'EXERCISE', 'value': 45, 'count': 4},
        {'category_name': 'FOOD', 'value': 50, 'count': 1},
        {'category_name': 'FRIEND', 'value': 60, 'count': 1},
        ], 
    'meta': {'best_category': 'MOVIE', 'percent' : 32, 'total_count' : 30}
};

axios.get = jest.fn(url => {
    return new Promise((resolve, reject) => {
        const result = {
        }
        resolve(result);
    })
})

describe('<StatDashBoard>', () => {
    beforeEach(() => {
    })

    it('should render without error', () => {
        let stubInitialState = {};
        let mockStore = getMockStore(stubInitialState)
        const statDashBoard = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                    <Route path="/" exact render={() => <StatDashBoard/>}/>
                    </Switch>    
                </ConnectedRouter>>
            </Provider>
            )

        const component = mount(statDashBoard);
        const calendarWrapper = component.find('.calendarChart');
        expectExport(calendarWrapper.length).toBe(1);

        const categoryWrapper = component.find('.categoryChart');
        expectExport(categoryWrapper.length).toBe(1);

        const friendWrapper = component.find('.friendChart');
        expectExport(friendWrapper.length).toBe(1);

        const frequencyWrapper = component.find('.categoryFrequencyChart');
        expectExport(frequencyWrapper.length).toBe(1);
    })

    it('should render without error', () => {
        let stubInitialState = {
            calendarData : calendarData,
            categoryData : categoryData,
            friendData : friendData, 
            categoryFreqData : categoryFreqData,
        };
        
        let mockStore = getMockStore(stubInitialState)
        const statDashBoard = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                    <Route path="/" exact render={() => <StatDashBoard/>}/>
                    </Switch>    
                </ConnectedRouter>>
            </Provider>
            )

        const component = mount(statDashBoard);
        const calendarWrapper = component.find('.calendarChart');
        expectExport(calendarWrapper.length).toBe(1);

        const categoryWrapper = component.find('.categoryChart');
        expectExport(categoryWrapper.length).toBe(1);

        const friendWrapper = component.find('.friendChart');
        expectExport(friendWrapper.length).toBe(1);

        const frequencyWrapper = component.find('.categoryFrequencyChart');
        expectExport(frequencyWrapper.length).toBe(1);
    })

    it('should render baseAreaChart', () => {
        const component1 = mount(<BaseAreaChart data={calendarData.graph_data} width={250} minHeight={350 } aspect={1}/>);
    })

    it('should render basePieChart', () => {
        const component2 = mount(
            <BasePieChart 
                data={categoryFreqData.graph_data} 
                dataKey="value" 
                width={250} 
                minHeight={350}
                cx={50}
                cy={50} 
                aspect={1}/>
            );
    })
})