import React from 'react';

class RowTable extends React.Component{
    parseMyDate(dateString){
        ///0123456789
        //"2017-12-05T03:06:33.000Z"

        const year = dateString.substring(0, 4);
        const month = dateString.substring(5, 7);
        const day = dateString.substring(8, 10);
        const hour = dateString.substring(11, 13);
        const min = dateString.substring(14, 16);
        const sec = dateString.substring(17, 19);

        // console.log('year: ' +year);
        // console.log('month: ' +month);
        // console.log('day: ' +day);
        // console.log('hour: ' +hour);
        // console.log('min: ' +min);
        // console.log('sec: ' +sec);

        const time = hour+'h '+min+'m '+sec+'s ';
        const date = day+'/'+month+'/'+year;

        return time + date;
    }

    concealWalletId(walletId){
        return "*******" + walletId.substring(5);
    }

    render(){
        return (
            <tr>
                <th scope="row" className="centered">{this.props.index}</th>
                <td className="centered">{this.concealWalletId(this.props.item.from_acc)}</td>
                <td className="centered">{this.parseMyDate(this.props.item.date)}</td>
                <td className="centered">{this.concealWalletId(this.props.item.to_acc)}</td>
                <td className="centered">{this.props.item.amount}</td>
            </tr>
        );
    }
}

export default RowTable;