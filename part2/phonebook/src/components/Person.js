import Personification from "./Personification"

const Person = ({personsToShow, handleDeletion}) => {
  return(
    <div>
      {personsToShow.map((person) => (
          <Personification key={person.name} person={person} handleDeletion={handleDeletion}/>
        ))}
    </div>
)}

export default Person
