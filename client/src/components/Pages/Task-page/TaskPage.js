import React from 'react'

import './TaskPage.style.scss';

class TaskPage extends React.Component {
  constructor() {
    super()
    this.state={
      task:'',
      completed:''
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  render() {
    const { task, completed } = this.state
    return (
      <div className='task-page'>
        <form className='form-task'>
          <input
            className='input-task' 
            name='task'
            type='String'
            value={task}
            onChange={this.handleChange}
            required
          />
          <button className='button-task'>ADD</button>
        </form>
        <div className='task-list-container'>
          <div className='task-list'>
            <div>description</div>
            <div>done</div>
            <div>remove</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskPage;