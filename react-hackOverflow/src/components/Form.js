import React from 'react'

export default class Form extends React.Component {
    state = {
        inputValues: ['', '', '']
    }
    setInputValue(e, index) {
        const inputValues = [...this.state.inputValues];
        inputValues[index] = e.target.value;
        this.setState({
            inputValues
        })
    }
    addProblem(e) {
        e.preventDefault();
        const [title, badges, content] = [...this.state.inputValues];
        if (title && badges && content) {
            this.props.addProblem({
                title,
                content,
                badges: [...badges.split(',')],
            });
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div>
                <div className="row mt-5 mb-5">
                    <div className="col-8 offset-2 text-center">
                        <h2>Задать вопрос</h2>
                    </div>
                </div>
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <div className="row">
                        <div className="col-12">
                            <form action="">
                                <div className="form-group">
                                    <input defaultValue='' onChange={(e) => this.setInputValue(e, 0)} id="problem-title" className="form-control" type="text" placeholder="Название вопроса" />
                                </div>
                                <div className="form-group">
                                    <input defaultValue='' onChange={(e) => this.setInputValue(e, 1)} id="problem-keywords" className="form-control" type="text" placeholder="Через запятую перечислите ключевые слова" />
                                </div>
                                <div className="form-group">
                                    <textarea defaultValue='' onChange={(e) => this.setInputValue(e, 2)} id="problem-text" className="form-control" rows="3" placeholder="Текст вопроса"></textarea>
                                </div>
                                <button onClick={this.addProblem.bind(this)} id="add-problem" type="submit" className="btn btn-primary">
                                    Задать вопрос
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}