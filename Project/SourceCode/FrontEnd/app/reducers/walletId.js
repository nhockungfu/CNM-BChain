import cst from '../constants/ActionTypes'

let walletId = (walletId = '', action) => {
    switch(action.type){
        case cst.CHANGE_WALLET_ID:{
            return action.walletId;
        }
        default:
            return walletId;
    }
};

module.exports = walletId;