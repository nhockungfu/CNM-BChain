const redux = require('redux');
const allExchangeList = require('./allExchangeList');
const email = require('./email');
const isLogined = require('./isLogined');
const surplus = require('./surplus');
const walletId = require('./walletId');
const isSignUp = require('./isSignUp');
const isExchangeTo = require('./isExchangeTo');
const isSignIn = require('./isSignIn');
const exchangeToStatus = require('./exchangeToStatus');
const exchangesOfUser = require('./exchangesOfUser');

const reducer = redux.combineReducers({
    allExchangeList,
    email,
    isLogined,
    surplus,
    walletId,
    isSignUp,
    isExchangeTo,
    isSignIn,
    exchangeToStatus,
    exchangeOfUser: exchangesOfUser
});

module.exports = reducer;