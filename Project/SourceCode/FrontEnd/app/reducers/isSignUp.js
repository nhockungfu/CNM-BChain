import cst from '../constants/ActionTypes'

let isSignUp = (state = false, action) => {
    switch(action.type){
        case cst.IS_SIGN_UP_START:{
            return true;
        }
        case cst.IS_SIGN_UP_DONE:{
            return false;
        }

        default:
            return state;
    }
};

module.exports = isSignUp;