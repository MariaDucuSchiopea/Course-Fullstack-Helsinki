import { useState } from 'react'
import Button from './components/Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  //const [randomAnecdote, setRandomAnecdote] = useState(0)
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  )
  const [bestAnecdote, setBestAnecdote] = useState(0)

  const handleSelectClick = () => {
    const randomAnecdote = Math.floor(
      Math.random() * anecdotes.length
    )
    //console.log(randomAnecdote)
    setSelected(randomAnecdote)
  }

  const handleVoteClick = () => {
    const previousVotes = { ...votes }
    previousVotes[selected] += 1
    setVotes(previousVotes)
    //console.log('votes updated', votes)
    let votesArr = Object.values(previousVotes)
    const max = Math.max(...votesArr)
    //console.log('max', max)
    setBestAnecdote(votesArr.indexOf(max))
    //console.log('index of max', votesArr.indexOf(max))
  }

  return (
    <div>
      <h2>{anecdotes[selected]}</h2>
      <h2>Votes for this one: {votes[selected]}</h2>
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleSelectClick} text='New anecdote' />
      <br />
      <h2>Anecdote with most votes:</h2>
      <h2>{anecdotes[bestAnecdote]}</h2>
      <h2>Votes for the best one: {votes[bestAnecdote]}</h2>
    </div>
  )
}

export default App
