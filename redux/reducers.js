import { GET_CITIES } from './actions';

const initialState = {
    // name: '',
    // age: 0,
    city: [],     //importing cities api for rseponse to show.
}

function userReducer(state = initialState, action) {
    switch(action.type){
        case GET_CITIES:
            return {...state, city: action.payload};  
        default:
            return state;
    }
}

export default userReducer;