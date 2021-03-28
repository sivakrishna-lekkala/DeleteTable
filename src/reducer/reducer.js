import {Map} from 'immutable';
import { fromJS } from "immutable";
 
const intialState:Map<String,any>=fromJS({
    data:{ 
    }
})

function stateSet(state,action,key){ 
    return state.setIn(["data",key],action.data)
}
 
function appReducer (state:Map<String,any>=intialState,action:Rx_Action){
    switch(action.type){ 
        case "GET_USER":
            return stateSet(state,action,"getUserDetails")
        default:
            return state;
    }
}
export default appReducer;