const Filter = ({filter, Filtration}) => {
    return(
    <div>search: 
    <input value={filter} onChange = {Filtration}>
    </input>
    </div>
    )
    }
    
    export default Filter