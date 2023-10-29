import { useState } from "react";

const App = () => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const randomAnecdoteHandler = () => {
    const randomIndex = getRandomNumber();
    setSelected(randomIndex);
  };

  const addVoteHandler = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] = votes[selected] + 1;

    setVotes(updatedVotes);
    setMostVotedAnecdote(anecdotes[getIndexOfLargestVote(updatedVotes)]);
    setLargestVote(getLargestVote(updatedVotes))
  };

  const getIndexOfLargestVote = (updatedVotes) => {
    return updatedVotes.indexOf(Math.max(...updatedVotes));
  };

  const getLargestVote = (updatedVotes) => Math.max(...updatedVotes)
  

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(anecdotes[selected]);
  const [largestVote, setLargestVote] = useState(0)

  return (
    <div>
      <DisplayTitle text="Anecdote of the day" />
      <br />
      {anecdotes[selected]}
      <br />
      Has {votes[selected]} votes
      <div>
        <Button onClickHanlder={addVoteHandler} text="Vote" />
        <Button onClickHanlder={randomAnecdoteHandler} text="Next anecdote" />
      </div>
      <br />
      <DisplayTitle text="Anecdote with most votes" /> <br />
      {mostVotedAnecdote} <br/>
      Has {largestVote} votes
    </div>
  );
};

const Button = ({ onClickHanlder, text }) => {
  return (
    <>
      <button onClick={onClickHanlder}>{text}</button>
    </>
  );
};

const DisplayTitle = ({ text }) => {
  return (
    <div>
      <strong>{text}</strong>
    </div>
  );
};


export default App;
