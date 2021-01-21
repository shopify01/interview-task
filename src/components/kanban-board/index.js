import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { name: 'task1', stage: 0 },
    { name: 'task2', stage: 0 },
    { name: 'task3', stage: 1 },
    { name: 'task4', stage: 1 },
    { name: 'task5', stage: 2 },
    { name: 'task6', stage: 2 },
    { name: 'task7', stage: 3 },
    { name: 'task8', stage: 3 }
  ]);
  const [newTask, setNewTask] = useState();
  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  const forwordAction = (task) => () => {   // Done By Prateek Kushwaha
    if (task.stage < 3) {
      let arr = [...tasks];
      let i = arr.findIndex(item => item.name == task.name)
      arr[i].stage = arr[i].stage + 1
      setTasks(arr)
    }
  }

  const backwordAction = (task) => () => {  // Done By Prateek Kushwaha
    if (task.stage > 0) {
      let arr = [...tasks];
      let i = arr.findIndex(item => item.name == task.name)
      arr[i].stage = arr[i].stage - 1
      setTasks(arr)
    }
  }

  const deleteAction = (task) => () => { // Done By Prateek Kushwaha
    let arr = [...tasks];
    let i = arr.findIndex(item => item.name == task.name)
    arr.splice(i, 1);
    setTasks(arr)
  }

  const onChangeTask = (e) => {
    setNewTask(e.target.value)
  }

  const addTaskToBacklog = () => { // Done By Prateek Kushwaha
    let arr = [...tasks]
    if (!(arr.findIndex(item => item.name.toLocaleLowerCase() == newTask.toLocaleLowerCase()) + 1)) {
      arr.push({ name: newTask, stage: 0 })
      setTasks(arr);
      setNewTask("")
    } else {
      alert("Task already exist")
    }
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          value={newTask}
          onChange={(e) => onChangeTask(e)}
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
        />
        <button
          onClick={addTaskToBacklog}
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
        >Create task</button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                      <div
                        className="li-content layout-row justify-content-between align-items-center"
                      >
                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                        <div className="icons">
                          <button
                            onClick={backwordAction(task)}
                            className="icon-only x-small mx-2"
                            data-testid={`${task.name.split(' ').join('-')}-back`}
                          >
                            <i className="material-icons">arrow_back</i>
                          </button>
                          <button
                            onClick={forwordAction(task)}
                            className="icon-only x-small mx-2"
                            data-testid={`${task.name.split(' ').join('-')}-forward`}
                          >
                            <i className="material-icons">arrow_forward</i>
                          </button>
                          <button
                            onClick={deleteAction(task)}
                            className="icon-only danger x-small mx-2"
                            data-testid={`${task.name.split(' ').join('-')}-delete`}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                      </div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );

}

export default KanbanBoard;