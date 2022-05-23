import { useState } from 'react'
import React from 'react'

  let int = 0
  let leader = 0

  const Length = (array) => {
    var result = array.length;
    return(
        result
    )
}

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]



  function getRandomInt(max) {
  return Math.floor(Math.random() * max);
  }

  const Display = (props) => {
    return(
      <>{props.text}
      <br></br>
      has {props.vote} votes
      </>
    )
  }



  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const App = () => {
  

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(Length(anecdotes)).fill(0))
  const [highest, setHighest] = useState(0)


  const setToSelected = (newSelected) => {
    console.log("new anecdote", newSelected)
    setToHighest()
    setSelected(newSelected)
  }

  const setToPoints  = (newPoints) =>  {
    console.log(int, newPoints)
    setToHighest()
    let newArr = [...points] // copying the old datas array
    newArr[int] = newPoints 
    setPoints(newArr)
  }

  const setToHighest = () => {
  for (let i=0; i<=leader;i++){
    if (points[i]>leader) {
        leader=points[i];
        setHighest(i)
        }
  }
}



  const Randomize = () => {
    console.log("random")
    let length = Length(anecdotes)
    return(
      int = getRandomInt(length)
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display text={anecdotes[selected]} vote={points[int]}/>
      <br></br>
      <Button handleClick={() =>setToPoints(points[int] + 1)} text="vote"/>
      <Button handleClick={() => setToSelected(Randomize)} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <Display text={anecdotes[highest]} vote={points[highest]}/>
    </div>
  )
}

export default App