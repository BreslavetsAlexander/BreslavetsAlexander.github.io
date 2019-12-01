import React from 'react'

export default class Problem extends React.Component {
    state = {
        comment: ''
    }
    componentDidMount() {
        this.props.updateProblemViewsNumber(this.props.problem);
    }
    addComment(e) {
        e.preventDefault();
        if (this.state.comment) {
            this.props.addComment(this.props.problem, this.state.comment);
            this.setState({
                comment: ''
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row mt-5 mb-5">
                    <div className="col-8 offset-2 text-center">
                        <h2>{this.props.problem.title}</h2>
                        {
                            this.props.problem.badges.map((badge, i) => {
                                return <a key={i} href="#" className="badge badge-dark" style={{marginRight: '3px'}}>{badge.toUpperCase()}</a>
                            })
                        }
                    </div>
                </div>
                <div className="pl-4 bg-white d-flex align-items-center">
                    <div className="vote mr-4">
                        <a onClick={() => this.props.updateProblemPoints(this.props.problem, 1)} href="#" className="vote__plus">
                            <i className="fas fa-chevron-up"></i>
                        </a>
                        <div className="vote__value">{this.props.problem.points}</div>
                        <a onClick={() => this.props.updateProblemPoints(this.props.problem, -1)} href="#" className="vote__minus">
                            <i className="fas fa-chevron-down"></i>
                        </a>
                    </div>
                    <p>{this.props.problem.content}</p>
                </div>
                <h2 className="mt-3 text-center">Комментарии: {this.props.problem.comments ? this.props.problem.comments.length : 0}</h2>
                <div>
                    {
                        this.props.problem.comments ? this.props.problem.comments.map(comment => {
                            return <div key={comment.id} className="pl-4 mb-3 bg-white d-flex align-items-center">
                                        <div className="vote mr-4">
                                            <a onClick={() => this.props.updateCommentPoints(this.props.problem, comment.id, 1)} href="#" className="vote__plus">
                                                <i className="fas fa-chevron-up"></i>
                                            </a>
                                            <div className="vote__value">{comment.points}</div>
                                            <a onClick={() => this.props.updateCommentPoints(this.props.problem, comment.id, -1)} href="#" className="vote__minus">
                                                <i className="fas fa-chevron-down"></i>
                                            </a>
                                        </div>
                                        <p>{comment.content}</p>
                                    </div>
                            }) : ''
                    }
                </div>
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <div className="row">
                        <div className="col-12">
                            <form action="">
                                <div className="form-group">
                                    <h3>Ваш ответ:</h3>
                                    <textarea value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})} className="form-control" id="textarea-comment" rows="3"></textarea>
                                </div>
                                <button onClick={this.addComment.bind(this)} id="add-comment-btn" type="submit" className="btn btn-primary">Комментировать</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}