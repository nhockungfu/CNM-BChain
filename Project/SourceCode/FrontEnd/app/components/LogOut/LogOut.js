import React from 'react';
import './LogOut.css';
import { connect } from 'react-redux';
import { logOut } from '../../actions/index';


class LogOut extends React.Component {
    handleClickDongY() {
        this.props.logOut();
        this.props.history.push('/');
    }

    handleClickTroVe() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div id="log-out-comp">
                <div className="hidden-margin-top"></div>
                <div className="msg-frame">
                    <p id="log-out-title-msg">Bạn có muốn đang xuất không?</p>
                    <hr id="log-out-hr-title" />
                    <div className="text-center log-out-btns">
                        <button
                            type="button"
                            id="log-out-btn-dong-y"
                            className="btn btn-danger"
                            onClick={this.handleClickDongY.bind(this)}
                        >Đồng ý</button>
                        <button
                            type="button"
                            id="log-out-btn-tro-ve"
                            className="btn btn-success"
                            onClick={this.handleClickTroVe.bind(this)}
                        >Trở về</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);