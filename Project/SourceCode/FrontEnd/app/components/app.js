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
import LogOut from './LogOut/LogOut';
import './app.css';
import '../libs/jquery-3.1.1.min.js';
import { connect } from 'react-redux';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="web-content">
                    <div className="header-nav">
                        <ul id="ul-nav">
                            <li>BLOCKCHAIN V2</li>
                            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                            <li><NavLink to="/AllExchange" activeClassName="active">All Exchange</NavLink></li>
                            <li><NavLink to="/ToOtherWallet" activeClassName="active">To Other Wallet</NavLink></li>
                            {
                                this.props.isLogined && 
                                <li className="log-out">
                                    <NavLink to="/LogOut" activeClassName="no-active">LogOut</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="clear-float" id="nav-content">
                        <Route exact path="/" component={Home} />

                        <Route exact path="/SignUp" render={() => {
                            return (
                                !this.props.isLogined ? <SignUp /> : <Redirect to="/" />
                            );
                        }} />

                        <Route path="/SignIn" render={() => {
                            return (
                                !this.props.isLogined ? <SignIn /> : <Redirect to="/" />
                            );
                        }} />

                        <Route path="/AllExchange" component={AllExchange} />

                        <Route path="/ToOtherWallet" render={() => {
                            return (
                                this.props.isLogined ? <ToOtherWallet /> : <Redirect to="/" />
                            );
                        }} />

                        <Route path="/LogOut" component={LogOut} />
                    </div>
                </div>
            </BrowserRouter>);
    }
}


function mapStateToProps(state) {
    return {
        email: state.email,
        isLogined: state.isLogined,
        surplus: state.surplus,
        walletId: state.walletId,
        isSignIn: state.isSignIn
    }
}
module.exports = connect(mapStateToProps)(App);
