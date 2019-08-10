import React from 'react'
import ButtonsPanel from './components/ButtonsPanel'
import InputPanel from './components/InputPanel'
import ToDoList from './components/ToDoList';

export default class extends React.Component {
  state = {
    toDoItems: [
      {title: "React", done: false, checked: false},
      {title: "In", done: false, checked: false},
      {title: "Action", done: false, checked: false},
    ]
  }
  addItem(e) {
    if (e.keyCode===13 && e.target.value.trim().length) {
      const toDoItems = [...this.state.toDoItems];
      toDoItems.unshift({
        title: e.target.value,
        done: false,
        checked: false
      });
      this.setState({toDoItems});
      e.target.value = '';
    }
  }
  checkItem(i) {
    const toDoItems = [...this.state.toDoItems];
    toDoItems[i].checked = !toDoItems[i].checked;
    this.setState({toDoItems});
  }
  doneItem(i) {
    const toDoItems = [...this.state.toDoItems];
    toDoItems[i].done = true;
    this.setState({toDoItems});
  }
  restoreItem(i) {
    const toDoItems = [...this.state.toDoItems];
    toDoItems[i].done = false;
    this.setState({toDoItems});
  }
  removeItem(i) {
    const toDoItems = [...this.state.toDoItems];
    toDoItems.splice(i, 1);
    this.setState({toDoItems});
  }
  selectAll() {
    const toDoItems = [...this.state.toDoItems];
    toDoItems.forEach(item => {
      item.checked = true;
    })
    this.setState({toDoItems});
  }
  doneItems() {
    const toDoItems = [...this.state.toDoItems];
    toDoItems.forEach(item => {
      if (item.checked){
        item.done = true;
        item.checked = false;
      }
    })
    this.setState({toDoItems});
  }
  restoreItems() {
    const toDoItems = [...this.state.toDoItems];
    toDoItems.forEach(item => {
      if (item.checked){
        item.done = false;
        item.checked = false;
      }
    })
    this.setState({toDoItems});
  }
  removeItems() {
    let toDoItems = [...this.state.toDoItems];
    toDoItems = toDoItems.filter(item => !item.checked);
    this.setState({toDoItems});
  }
  activePanel() {
    let k = 0;
    this.state.toDoItems.forEach(item => {
      if (item.checked) {
        k++;
      }
    })
    return k<1 ? <InputPanel 
                    selectAll={this.selectAll.bind(this)} 
                    addItem={this.addItem.bind(this)}
                  /> 
                : <ButtonsPanel
                    doneItems={this.doneItems.bind(this)}
                    restoreItems={this.restoreItems.bind(this)}
                    removeItems={this.removeItems.bind(this)}
                  />
  }
  render() {
    return (
      <React.Fragment>
        <div className="card" style={{marginTop: '10px'}}>
          <div className="card-header">
            <h4 className="card-title">Todo React application</h4>
          </div>
          <div className="card-body">
            {this.activePanel()}
          </div>
          <ToDoList
            toDoItems={this.state.toDoItems}
            checkItem={this.checkItem.bind(this)}
            doneItem={this.doneItem.bind(this)}
            restoreItem={this.restoreItem.bind(this)}
            removeItem={this.removeItem.bind(this)}
          />
        </div>
      </React.Fragment>
    )
  }
}