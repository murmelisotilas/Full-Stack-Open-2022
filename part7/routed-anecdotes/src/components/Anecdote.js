import { useParams } from "react-router-dom"

export const SpesifiedAnecdote = ({ anecdotes }) => {
    const id = useParams().id 
    const idAnecdote = anecdotes.find(a => a.id === Number(id))
    return ( 
        <div>
            <h2>{idAnecdote.content} by {idAnecdote.author}</h2>
            <div>has {idAnecdote.votes} votes</div>
            <br></br>
            <div>for more info see {idAnecdote.info}</div>
            <br></br>
        </div>        
    )
}