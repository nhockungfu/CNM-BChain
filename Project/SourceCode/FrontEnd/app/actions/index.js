import cst from '../constants/ActionTypes';
import $ from '../libs/jquery-3.1.1.min.js';


function getAllExchangeList(exchangeList){
    return {
        type: cst.GET_ALL_EXCHANGE_LIST,
        data: exchangeList
    }
}

function toggleIsLogin(){
    return {
        type: cst.TOGGLE_LOGIN
    }
}

function changeEmail(email){
    return {
        type: cst.CHANGE_EMAIL,
        email
    }
}

function changeSurplus(surplus){
    return {
        type: cst.CHANGE_SURPLUS,
        surplus
    }
}

function changeWalletId(walletId){
    return {
        type: cst.CHANGE_WALLET_ID,
        walletId
    }
}

function isSignUpStart(){
    return {
        type: cst.IS_SIGN_UP_START,
    }
}

function isSignUpDone(){
    return {
        type: cst.IS_SIGN_UP_DONE
    }
}

function isExchangeStart(){
    return {
        type: cst.IS_EXCHANGE_START
    }
}

function isExchangeDone(){
    return {
        type: cst.IS_EXCHANGE_DONE
    }
}

function signInStart(){
    return {
        type: cst.IS_SIGN_IN_START
    }
}

function signInDone(){
    return {
        type: cst.IS_SIGN_IN_DONE
    }
}

function setExchangeToSuccess(){
    return {
        type: cst.EXCHANGE_TO_SUCCESSFUL
    }
}

function setExchangeToFail(){
    return {
        type: cst.EXCHANGE_TO_FAIL
    }
}

function exchangeToStatusReset(){
    return {
        type: cst.EXCHANGE_TO_STATUS_RESET
    }
}

function getUserExchangeList(){
    return {
        type: cst.GET_EXCHANGES_OF_USER
    }
}


function exchangeTo(fromWalletId, toWalletId, amount){
    return (dispatch, getState) => {
        let status;
        dispatch(isExchangeStart());
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            url: "http://127.0.0.1:3000/exchange/chuyenTien",
            data: {
                fromWalletId: fromWalletId,
                toWalletId: toWalletId,
                amount: amount
            },
            success: function(res) {
                console.log('Response of ToOtherWallet: ' + JSON.stringify(res));
                if(res.status === 200){
                    dispatch(changeSurplus(res.surplusRemain));
                    dispatch(setExchangeToSuccess());
                    console.log('Chuyển tiền thành công!');
                } else{
                    if(res.status === 406){
                        dispatch(setExchangeToFail());
                        console.log('Chuyển tiền thất bại!');
                    }
                }
                status = getState().exchangeToStatus;
            }
        }).then(()=>{
            if(status === 1){
                alert('Chuyển tiền thành công!');
            } else{
                if(status === 0){
                    alert('Chuyển tiền thất bại!');
                }
            }
            dispatch(exchangeToStatusReset());
            dispatch(isExchangeDone());
        });
    }
}

function signUp(email, password, surplus){
    return (dispatch) => {
        dispatch(isSignUpStart());
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            url: "http://127.0.0.1:3000/account/dangKy",
            data: {
                email: email,
                password: password,
                surplus: surplus
            },
            success: function(res) {
                console.log(res);
                if(res.status === 200){
                    dispatch(toggleIsLogin());
                    dispatch(changeWalletId(res.wallet_id));
                    dispatch(changeEmail(res.email));
                    dispatch(changeSurplus(res.surplus));

                    console.log('Đăng ký thành công!');
                    console.log('_Thông tin tài khoản: ');
                    console.log(' + Mã ví: ' + res.wallet_id);
                    console.log(' + email: ' + res.email);
                    console.log(' + surplus: ' + res.surplus);

                }
                else{
                    console.log('Đăng ký thất bại!');
                }
            }
        }).then(()=>{

            dispatch(isSignUpDone());
        });
    }
}

function signIn(walletId, password){
    return (dispatch) => {
        dispatch(signInStart());
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            url: "http://127.0.0.1:3000/account/dangNhap",
            data: {
                wallet_id: walletId,
                password: password
            },
            success: function(res) {
                if(res.status === 200){

                    dispatch(toggleIsLogin());
                    dispatch(changeWalletId(res.wallet_id));
                    dispatch(changeEmail(res.email));
                    dispatch(changeSurplus(res.surplus));

                    console.log('Đăng nhập thành công!');
                    console.log(' + Mã ví: ' + res.wallet_id);
                    console.log(' + Email: ' + res.email);
                    console.log(' + Số dư: ' + res.surplus);
                }
                else
                    console.log('Đăng nhập thất bại');
            }
        }).then(()=>{
            dispatch(signInDone());
        });
    }
}

function fetchAllExchangeList(){
    return (dispatch) => {
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: "http://127.0.0.1:3000/exchange/dsTatCaGiaoDich",
            success: function(res) {
                dispatch(getAllExchangeList(res.data));
            }
        });
    }
}

function fetchExchangesOfUse(walletId){
    return (dispatch) => {
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: "http://127.0.0.1:3000/exchange/dsGiaoDich/" + walletId,
            success: function(res) {
                dispatch(getUserExchangeList(res.data));
            }
        });
    }
}

function logOut(){
    return (dispatch) => {
        dispatch(toggleIsLogin());
        dispatch(changeEmail(''));
        dispatch(changeSurplus(-1));
        dispatch(changeWalletId(''));
    }
}


module.exports = {
    getAllExchangeList,
    toggleIsLogin: toggleIsLogin,
    changeEmail,
    changeSurplus,
    changeWalletId,
    signUp,
    exchangeTo,
    signIn,
    fetchAllExchangeList,
    exchangeToStatusReset,
    fetchExchangesOfUse,
    logOut
};