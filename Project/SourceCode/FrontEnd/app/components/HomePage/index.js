import React from 'react'
import {
    Link
} from 'react-router-dom';
import './index.css';
import {connect} from 'react-redux';
import {fetchExchangesOfUse} from './../../actions/index'


class Home extends React.Component{
    render(){
        return(
            <div className="home-page">
                <h3>This is HomePage</h3>
                {
                    this.props.isSignUp && <em>Đang đang ký, xin chờ giây lát...</em>
                }
                {
                    this.props.isLogined && !this.props.isSignUp ?
                    <div>
                        <h5 className="text-success"><em>@Sign in successed!</em></h5>
                        <h5>- <strong>Your email: </strong>{this.props.email}</h5>
                        <h5>- <strong>Your wallet id: </strong>{this.props.walletId}</h5>
                        <h5>- <strong>Your surplus: </strong>{this.props.surplus} VND</h5>
                    </div>
                    :
                    <h5>
                        Let's
                        &nbsp;<Link to="/SignIn">Sign in</Link>&nbsp;
                        or
                        &nbsp;<Link to="/SignUp">Sign up</Link>&nbsp;
                        to access our website.
                    </h5>
                }
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        email: state.email,
        isLogined: state.isLogined,
        surplus: state.surplus,
        walletId: state.walletId,
        isSignUp: state.isSignUp
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchExchangesOfUse: (walletId) => dispatch(fetchExchangesOfUse(walletId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
