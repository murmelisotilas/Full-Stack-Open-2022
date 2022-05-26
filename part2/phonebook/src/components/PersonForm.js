
const PersonForm = ({addPerson, newPerson, handleNameChange, newNumber, handleNumberChange}) => {
    return(
<form onSubmit = {addPerson}>
        <div>
          name: 
          <input 
          value = {newPerson} 
          onChange = {handleNameChange}
          />
        </div>
        <div>number:
          <input 
            value = {newNumber} 
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

      export default PersonForm