import RowTable from './RowTable';


function BodyTable(props){
    return (
        <tbody>
        {
                props.lstExchange.map((item, index) => {
                    return <RowTable item={item} index={index} key={index}/>;
                })
        }
        </tbody>
    );
}

export default BodyTable;