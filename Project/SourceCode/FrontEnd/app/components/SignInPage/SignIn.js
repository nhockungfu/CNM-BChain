import React from 'react';
import './SignIn.css';
import {connect} from 'react-redux';
import {signIn} from '../../actions/index';

class SignIn extends React.Component{
    handleClickSignIn(){
        const walletId = this.refs.walletId.value.trim();
        const password = this.refs.password.value.trim();

        this.props.signIn(walletId, password);

        // this.refs.walletId.value = '';
        // this.refs.password.value = '';
    }
    render(){
        return(
            <div className="SignInComp">
                <h3>Sign in for account</h3>
                {
                    this.props.isSignIn && <em>Đang đang nhập, vui lòng đợi...</em>
                }
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Wallet id</label>
                    <div className="col-sm-10">
                        <input type="text" placeholder="Wallet id" ref="walletId"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" placeholder="Password" ref="password"/>
                    </div>
                </div>
                <button onClick={this.handleClickSignIn.bind(this)}>Sign In</button>
            </div>
        );
    }
}

function mapStartToProps(state){
    return {
        isSignIn: state.isSignIn
    };
}

function mapDispatchToProps(dispatch){
    return {
        signIn: (walletId, password) => dispatch(signIn(walletId, password))
    };
}

export default connect(mapStartToProps, mapDispatchToProps)(SignIn);
