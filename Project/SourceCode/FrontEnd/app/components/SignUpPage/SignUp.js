import React from 'react'
import './SignUp.css'
import {
    signUp
} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

class SignUp extends React.Component{
    handleClickSignUp(){
        var email = this.refs.email.value.trim();
        var password = this.refs.password.value.trim();
        var surplus = this.refs.surplus.value.trim();

        this.props.signUp(email, password, surplus);

        this.refs.email.value = '';
        this.refs.password.value = '';
    }
    render(){
        const {isLogined, isSignUp} = this.props;
        let content = '';
        if(!isLogined && !isSignUp){
            content = (
                <div className="SignUpComp">
                    <h3>Sign up for account</h3>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" placeholder="Email" ref="email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" placeholder="Password" ref="password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Surplus</label>
                        <div className="col-sm-10">
                            <input type="number" value={1000} ref="surplus" disabled/>
                        </div>
                    </div>
                    <button onClick={this.handleClickSignUp.bind(this)}>Sign Up</button>
                </div>
            )
        }
        else if(isSignUp){
            content = <em>DDang dang ky, vui long doi.</em>
        }else if(isLogined && !isSignUp){
            this.props.history.push('/')
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        isLogined: state.isLogined,
        isSignUp: state.isSignUp
    }
}

function mapDispatchToProps (dispatch) {
    return {
        signUp: (email, password, surplus) => dispatch(signUp(email, password, surplus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
