import cst from '../constants/ActionTypes'

let allExchangeList = (allExchangeList = [], action) => {
    switch(action.type){
        case cst.GET_ALL_EXCHANGE_LIST:{
            return action.data;
        }
        default:
            return allExchangeList;
    }
};

module.exports = allExchangeList;