import React, { useState } from "react";
import Section from "components/Section/Section";
import Statistics from "components/Statistics/Statistics";
import FeedbackOptions from "components/FeedbackOptions/FeedbackOptions";
import Notification from "components/Notification/Notification";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const addFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1
    }));
  };

  const { good, neutral, bad } = feedback;
  const countTotalFeedback = good + neutral + bad;

  const countPositiveFeedbackPercentage = countTotalFeedback === 0 ? 0 : Math.round((good / countTotalFeedback) * 100);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={addFeedback}
        />
      </Section>
      {countTotalFeedback ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        </Section>
      ) : (
        <Notification message={"No feedback given"} />
      )}
    </div>
  );
};

export {App}