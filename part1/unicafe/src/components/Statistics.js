import StatisticLine from './StatisticLine'
const Statistics = ({ good, neutral, bad }) => {
  const totalFeedbacks = good + neutral + bad
  if (totalFeedbacks === 0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  } else {
    const average = (good * 1 + bad * -1) / totalFeedbacks
    const positivePercentage = (good / totalFeedbacks) * 100
    return (
      <div>
        <h1>Statistics:</h1>
        <br />
        <StatisticLine text='Good' value={good} um={''} />
        <StatisticLine text='Neutral' value={neutral} um={''} />
        <StatisticLine text='Bad' value={bad} um={''} />
        <StatisticLine
          text='All feedback'
          value={totalFeedbacks}
          um={''}
        />
        <StatisticLine
          text='Average (good=1, bad=-1)'
          value={average}
        />
        <StatisticLine
          text='Positive percentage'
          value={positivePercentage}
          um={'%'}
        />
      </div>
    )
  }
}
export default Statistics
