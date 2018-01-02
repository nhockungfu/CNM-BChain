function HeadTable(props){
    return (
        <thead>
        <tr>
            {
                props.colNames.map((item, index)=>{
                    return <th className="centered" scope="col" key={index}>{item}</th>;
                })
            }
        </tr>
        </thead>
    );
}

export default HeadTable;