import cst from '../constants/ActionTypes'

let isLogined = (state = false, action) => {
  switch(action.type){
      case cst.TOGGLE_LOGIN:{
          return !state;
      }
      default:
          return state;
  }
};

module.exports = isLogined;