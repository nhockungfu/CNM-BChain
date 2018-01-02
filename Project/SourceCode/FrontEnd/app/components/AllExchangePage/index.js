import React from 'react';
import '../../libs/jquery-3.1.1.min.js';
import $ from '../../libs/jquery-3.1.1.min.js';
import './index.css';
import HeadTable from './HeadTable';
import BodyTable from './BodyTable';
import {fetchAllExchangeList} from '../../actions/index';
import {connect} from 'react-redux';

class AllExchange extends React.Component{
    componentDidMount(){
        this.timerId = setInterval(() => {
            this.props.fetchAllExchangeList();
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    render(){
        return (
            <div>
                <h3>This is all exchange of system</h3>
                {
                    this.props.allExchangeList.length === 0 ?
                    <h5>Waiting a moment...</h5>
                    :
                    <table className="table table-striped">
                        <HeadTable
                            colNames={[
                                'STT',
                                'FROM WALLET',
                                'DATETIME EXCHANGE',
                                'TO WALLET',
                                'AMOUNT'
                            ]}
                        />
                        <BodyTable lstExchange={this.props.allExchangeList}/>
                    </table>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        allExchangeList: state.allExchangeList
    }
}

function mapDispatchToProps(Dispatch){
    return {
        fetchAllExchangeList: () => Dispatch(fetchAllExchangeList())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllExchange);
