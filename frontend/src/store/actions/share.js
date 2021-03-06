import * as actionTypes from './actionTypes';
import axios from 'axios';

export const shareDiary_ = (diary) => {
    return{
        type : actionTypes.SHARE_DIARY,
        author : diary.user,
        origin_diary : diary.origin_diary,
        content : diary.content,
        category : diary.category,
        flower_users : diary.flower_users,
        shared_date : diary.shared_date
    };
};


export const shareDiary = (id, content) => {
    return (dispatch) => {
        return axios.post('/api/diary/share/'+id+'/', content)
        .then(res => dispatch(shareDiary_(res)))
        .catch( error => {
            if(error.response.status === 400){
                console.log('중복')
            }
        } 
     )
  };
}