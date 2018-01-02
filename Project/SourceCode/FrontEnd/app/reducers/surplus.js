import cst from '../constants/ActionTypes'

let surplus = (surplus = null, action) => {
    switch(action.type){
        case cst.CHANGE_SURPLUS:{
            return action.surplus;
        }
        default:
            return surplus;
    }
};

module.exports = surplus;