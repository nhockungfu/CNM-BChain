import cst from '../constants/ActionTypes'

let isExchangeTo = (state = false, action) => {
    switch(action.type){
        case cst.IS_EXCHANGE_START:{
            return true;
        }
        case cst.IS_EXCHANGE_DONE:{
            return false;
        }
        default:
            return state;
    }
};

module.exports = isExchangeTo;