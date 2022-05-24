import React from 'react'



const Course = (props) => {

    const Header = (props) => {
    console.log(props)
    return(
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

let TotalAmount = (props) =>
props.number.reduce((sum, part,) => { 
  console.log('what is happening', sum, part)
  return(sum + part.exercises)}, 0)

const Part = (props) => {
  return(
    <div>
    <ul>
      {props.part.map(part => 
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>)}
    </ul>
  </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part = {props.course}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <>
      <p> Total of <TotalAmount number={props.section}/> exercises</p>
    </>
  )
}


    return(
    <>
    <Header course={props.course}/>
    <Content course={props.part} />
    <Total section={props.part} />
    </>
    )
  }

  export default Course