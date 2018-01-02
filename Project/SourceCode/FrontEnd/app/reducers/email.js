import cst from '../constants/ActionTypes'

let email = (email = '', action) => {
    switch(action.type){
        case cst.CHANGE_EMAIL:{
            console.log('Change Email: ' + action.email);
            return action.email;
        }
        default:
            return email;
    }
};

module.exports = email;