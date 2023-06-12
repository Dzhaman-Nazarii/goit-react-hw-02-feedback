import {Component} from "react"
import Statistics from "components/Statistics/Statistics";
import Section from "components/Section/Section";
import FeedbackOptions from "components/FeedbackOptions/FeedbackOptions";
import Notification from "components/Notification/Notification";

export class App extends Component{
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  addFeedbackOption = option => {
    this.setState(state => ({
      [option]: state[option] + 1,}));
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }

  countPositiveFeedbackPercentage() {
    const totalFeedback = this.countTotalFeedback();
    const { good } = this.state;
    if (totalFeedback === 0) {
      return 0;
    }
    const positivePercentage = (good / totalFeedback) * 100;
    return Math.round(positivePercentage);
  }

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.addFeedbackOption}
          />
        </Section>
        {this.countTotalFeedback()
          ? (<Section>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback()}
                positiveFeedback={this.countPositiveFeedbackPercentage()}>
              </Statistics>
            </Section>)
          : <Notification message={"There is no feedback"}></Notification>  
        }
      </div>
    )
  }
}