
const Part = (props) => {
  return(
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Content = () => {
    return(
      <div>
        <Part part={parts[0].name} exercises={parts[0].exercises}/>
        <Part part={parts[1].name} exercises={parts[1].exercises}/>
        <Part part={parts[2].name} exercises={parts[2].exercises}/>
      </div>
    )
  }

  const Total = () => {
    return(
      <>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}


export default App;
