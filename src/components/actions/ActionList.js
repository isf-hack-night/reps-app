import React from 'react';
import WordPress from 'api/WordPress';


class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.wordPress = new WordPress('/wp-json/wp/v2');
    this.state = {
      issues: [],
      currentIssue: null,
      actions: []
    };
    this.onSelectIssue = this.onSelectIssue.bind(this);
  }

  componentDidMount() {
    this.wordPress.searchIssues({}).then(issues => this.setState({issues}));
  }

  onSelectIssue(event) {
    const issueId = event.target.value;
    this.wordPress.searchActions({issue: issueId}).then(
        actions => this.setState({actions, currentIssue: issueId})
    )
  }

  render() {
    const options = [];
    for (const issue of this.state.issues) {
      options.push(<option key={issue.id} id={issue.id} value={issue.id}>{issue.name}</option>);
    }
    const actions = [];
    for (const action of this.state.actions) {
        actions.push(<a href={action.link}>{action.title.rendered}</a>);
    }
    return (
      <div>
        <select onChange={this.onSelectIssue}>
          {options}
        </select>
          {actions}
      </div>
    );
  }
}

export default ActionList;
