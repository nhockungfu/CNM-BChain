import React from 'react';
import './ToOtherWallet.css';
import '../../libs/jquery-3.1.1.min.js';
import {connect} from 'react-redux';
import {exchangeTo} from '../../actions/index';

class ToOtherWallet extends React.Component{
    handleClickExchange(){
        const toWalletId = this.refs.walletId.value.trim();
        let amount = this.refs.amount.value.trim();
        amount = parseInt(amount);

        this.props.exchangeTo(this.props.walletId, toWalletId, amount);

        this.refs.walletId.value = '';
        this.refs.amount.value = '';
    }

    render(){
        return(
            <div className="ToOtherWalletComp">
                {
                    this.props.isExchangeTo === true && <em>Đang chuyển tiền, vui lòng đợi...</em>
                }
                <h3>Let's pay to he!</h3>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Wallet id</label>
                    <div className="col-sm-10">
                        <input type="text" placeholder="Put in his wallet id" ref="walletId"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Amount</label>
                    <div className="col-sm-10">
                        <input type="number" placeholder="Put amount of exchange" ref="amount"/>
                    </div>
                </div>
                <button onClick={this.handleClickExchange.bind(this)}>PAY</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        walletId: state.walletId,
        isExchangeTo: state.isExchangeTo,
        exchangeToStatus: state.exchangeToStatus
    };
}

function mapDispatchToProps(dispatch){
    return{
        exchangeTo: (fromWalletId, toWalletId, amount) => dispatch(exchangeTo(fromWalletId, toWalletId, amount))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToOtherWallet);
