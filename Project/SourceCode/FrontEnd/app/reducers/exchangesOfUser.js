import cst from '../constants/ActionTypes'

let exchangeOfUser = (allExchangeList = [], action) => {
    switch(action.type){
        case cst.GET_EXCHANGES_OF_USER:{
            return action.data;
        }
        default:
            return allExchangeList;
    }
};

module.exports = exchangeOfUser;