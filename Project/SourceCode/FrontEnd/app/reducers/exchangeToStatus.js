import cst from '../constants/ActionTypes'

let exchangeToStatus = (status = -1, action) => {
    switch(action.type){
        case cst.EXCHANGE_TO_SUCCESSFUL:{
            console.log('status is success');
            return 1;
        }
        case cst.EXCHANGE_TO_FAIL:{
            console.log('status is fail');
            return 0;
        }
        case cst.EXCHANGE_TO_STATUS_RESET:{
            return -1;
        }
        default:
            return status;
    }
};

module.exports = exchangeToStatus;