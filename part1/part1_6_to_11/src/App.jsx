import { useState } from "react";

const Button = ({ onClickHandler, text }) => {
  return (
    <>
      <button onClick={onClickHandler}>{text}</button>
    </>
  );
};

const StatisticLine = ( {text, value} ) => {
  return (
    <>
    {text} {value} <br/>
    </>
  )
}

const DisplaySubTitle = ({ text }) => {
  return (
    <p>
      <strong>{text}</strong>
    </p>
  );
};

const Statistics = ({ stats }) => {
  if (stats.all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text="good" value={stats.good} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="neutral" value={stats.neutral} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="bad" value={stats.bad} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="all" value={stats.all} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="average" value={stats.average} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="positive" value={stats.positive} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return <div>No feedback given</div>;
};


const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const calculateStats = (updatedFeedback) => {
    const newAverage =
      (updatedFeedback.good - updatedFeedback.bad) / updatedFeedback.all;
    const positiveRatio =
      (updatedFeedback.good / updatedFeedback.all) * 100 + " %";

    return {
      ...updatedFeedback,
      average: newAverage,
      positive: positiveRatio,
    };
  };

  const feedbackClickHandler = (text) => {
    let updatedFeedback;

    switch (text) {
      case "good":
        updatedFeedback = {
          ...feedback,
          good: feedback.good + 1,
          all: feedback.all + 1,
        };
        break;
      case "neutral":
        updatedFeedback = {
          ...feedback,
          neutral: feedback.neutral + 1,
          all: feedback.all + 1,
        };
        break;
      case "bad":
        updatedFeedback = {
          ...feedback,
          bad: feedback.bad + 1,
          all: feedback.all + 1,
        };
        break;
      default:
        break;
    }

    const updatedFeedbackWithStats = calculateStats(updatedFeedback);

    setFeedback(updatedFeedbackWithStats);
  };

  return (
    <div>
      <DisplaySubTitle text="Give feedback" />
      <div>
        <Button
          onClickHandler={() => feedbackClickHandler("good")}
          text="good"
        />
        <Button
          onClickHandler={() => feedbackClickHandler("neutral")}
          text="neutral"
        />
        <Button onClickHandler={() => feedbackClickHandler("bad")} text="bad" />
      </div>
      <DisplaySubTitle text="Statistics" />
      <Statistics stats={feedback} />
    </div>
  );
};

export default App;
