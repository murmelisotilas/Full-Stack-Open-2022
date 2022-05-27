const Personification = ({ person, handleDeletion }) => {
    return( 
    <div>
      <div>{person.name} {person.number}</div>
      <button onClick={() => handleDeletion(person.id, person.name)}>
            delete
          </button>
    </div>
    )
  }
  
  export default Personification