import React from 'react'
import {Route, NavLink} from 'react-router-dom'

import Form from './components/Form'
import Problem from './components/Problem'
import Problems from './components/Problems'
import Loader from './components/Loader'
import {getData, updateData} from './firebase'

export default class App extends React.Component {
  state = {
    problems: null,
    loading: true
  };
  componentDidMount() {
    getData()
      .then(res => this.setState({problems: res.val(), loading: false}))
      .catch(e => console.log(e))
  }
  addProblem(desc) {
    const problems = [...this.state.problems];
    const {title, content, badges} = desc;
    problems.push({
      id: problems.length + 1,
      title,
      content,
      points: 0,
      viewsNumber: 0,
      badges,
      comments: []
    });
    this.setState({
      problems
    })
    updateData(this.state.problems);
  }
  addComment(p, comment) {
    const problems = [...this.state.problems];
    const problem = problems.find(item => item.id === p.id);
    problem.comments = [];
    problem.comments.push({
      id: problem.comments.length + 1,
      content: comment,
      points: 0,
    })
    this.setState({
      problems
    })
    updateData(this.state.problems);
  }
  updateProblemPoints(p, a) {
    const problems = [...this.state.problems];
    const problem = problems.find(item => item.id === p.id);
    problem.points += a;
    this.setState({
      problems
    })
    updateData(this.state.problems);
  }
  updateCommentPoints(p, commentId, a) {
    const problems = [...this.state.problems];
    const problem = problems.find(item => item.id === p.id);
    const comment = problem.comments.find(item => item.id === commentId);
    comment.points += a;
    this.setState({
      problems
    })
    updateData(this.state.problems);
  }
  updateProblemViewsNumber(p) {
    const problems = [...this.state.problems];
    const problem = problems.find(item => item.id === p.id);
    problem.viewsNumber++;
    this.setState({
      problems
    })
    updateData(this.state.problems);
  }
  render() {
    return (
      <div className="container">
        <NavLink to="/" title="на главную">
          <h1 className="logo text-center mt-5 mb-5">👨‍💻👩‍💻👩‍💻 React HackOverflow</h1>
        </NavLink>
        <Route path="/" exact render={() => this.state.loading ? <Loader /> : <Problems problems={this.state.problems} />}/>
        <Route path="/add-problem-form" exact render={(props) => <Form {...props} addProblem={this.addProblem.bind(this)} />}/>
        <Route 
          path="/problems/:id" 
          exact 
          render={
            (props) => <Problem 
                          updateProblemPoints={this.updateProblemPoints.bind(this)}
                          updateCommentPoints={this.updateCommentPoints.bind(this)}
                          updateProblemViewsNumber={this.updateProblemViewsNumber.bind(this)}
                          problem={this.state.problems.find(item => item.id === +props.match.params.id)}
                          addComment={this.addComment.bind(this)}
                        />
          } 
        />
      </div>
    )
  }
}