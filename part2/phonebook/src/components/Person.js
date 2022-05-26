import Personification from "./Personification"

const Person = ({personsToShow}) => {
  return(
    <div>
      {personsToShow.map((person) => (
          <Personification key={person.name} person={person} />
        ))}
    </div>
)}

export default Person
