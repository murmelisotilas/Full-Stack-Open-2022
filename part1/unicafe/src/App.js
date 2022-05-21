import { useState } from 'react'

const PreStatistics = (props) => {
return(
  <tbody>
  <tr>
  <td>{props.text}</td>
  <td>{props.value}{props.symbol}</td>
  </tr>
  </tbody>
  )
}



const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setReviews] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const Statistics = () => {
    if(allReviews === 0){
      return(
        <div>
          No feedback given
        </div>
      )
    }
    return(
    
        <table>
          <PreStatistics text="good" value={good}/>
          <PreStatistics text="neutral" value={neutral}/>
          <PreStatistics text="bad" value={bad} />
          <PreStatistics text="all" value={allReviews}/>
          <PreStatistics text="average" value={average}/>
          <PreStatistics text="positive" value={positive} symbol={"%"}/>
        </table>
        
    )
  }

  const setToGood = (newGood) => {
     console.log('good', newGood)
     setReviews(allReviews + 1)
     setAverage((newGood - bad)/(allReviews))
     setPositive(((good)/(allReviews))*100)
     setGood(newGood)
  }
  const setToNeutral = (newNeutral) => {
     console.log('neutral', newNeutral)
     setReviews(allReviews + 1)
     setAverage((good - bad)/(allReviews))
     setPositive(((good)/(allReviews))*100)
     setNeutral(newNeutral)
  }
  const setToBad = (newBad) => {
     console.log('bad', newBad)
     setReviews(allReviews + 1)
     setAverage((good - newBad)/(allReviews))
     setPositive(((good)/(allReviews))*100)
     setBad(newBad)
  }

  return (
  <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <br></br>
      <h1>statistics</h1>
      <Statistics/>
    </div>
  )
}

export default App