import cst from '../constants/ActionTypes'

let isSignIn = (state = false, action) => {
    switch(action.type){
        case cst.IS_SIGN_IN_START:{
            console.log('sign in is start');
            return true;
        }
        case cst.IS_SIGN_IN_DONE:{
            console.log('sign in is done');
            return false;
        }
        default:
            return state;
    }
};

module.exports = isSignIn;