import React from 'react';
import {
    BrowserRouter,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom';
import Home from './HomePage/index';
import SignIn from './SignInPage/SignIn';
import SignUp from './SignUpPage/SignUp';
import AllExchange from './AllExchangePage/index';
import ToOtherWallet from './ToOtherWalletPage/ToOtherWallet';
import './app.css';
import '../libs/jquery-3.1.1.min.js';
import {connect} from 'react-redux';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="header-nav">
                        <ul>
                            <li>BLOCKCHAIN V2</li>
                            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                            <li><NavLink to="/AllExchange" activeClassName="active">All Exchange</NavLink></li>
                            <li><NavLink to="/ToOtherWallet" activeClassName="active">To Other Wallet</NavLink></li>
                        </ul>
                    </div>
                    <div className="clear-float">
                        <Route exact path="/" component={Home}/>

                        <Route exact path="/SignUp" render={() =>
                        {
                            return (
                                !this.props.isLogined ? <SignUp /> : <Redirect to="/" />
                            );
                        }}/>

                        <Route path="/SignIn" render={()=>{
                            return (
                                !this.props.isLogined ? <SignIn /> : <Redirect to="/" />
                            );
                        }}/>

                        <Route path="/AllExchange" component={AllExchange} />

                        <Route path="/ToOtherWallet" render={()=>{
                            return (
                                this.props.isLogined ? <ToOtherWallet/> : <Redirect to="/" />
                            );
                        }}/>
                    </div>
                </div>
            </BrowserRouter>);
    }
}


function mapStateToProps(state){
    return {
        email: state.email,
        isLogined: state.isLogined,
        surplus: state.surplus,
        walletId: state.walletId,
        isSignIn: state.isSignIn
    }
}
module.exports = connect(mapStateToProps)(App);
