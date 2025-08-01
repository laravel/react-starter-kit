import { useState, ChangeEvent } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import InputGroup from 'react-bootstrap/InputGroup';

// project-imports
import MainCard from '@/components/MainCard';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

const statisticsData: Task[] = [
  { id: 1, task: 'Lorem Ipsum Dolor Sit Amet', completed: false },
  { id: 2, task: "Industry's standard dummy text ever since the 1500s", completed: false },
  { id: 3, task: 'The point of using Lorem Ipsum is that it has a more-or-less', completed: false },
  { id: 4, task: 'Contrary to popular belief', completed: false },
  { id: 5, task: 'There are many variations of passages of Lorem Ipsum', completed: false },
  { id: 6, task: 'Sed ut perspiciatis unde omnis iste natus', completed: false },
  { id: 7, task: 'must explain to you how all this mistaken idea', completed: false }
];

// ==============================|| APPLICATION TASK - SUB TASK LIST ||============================== //

export default function SubTaskList() {
  const [tasks, setTasks] = useState<Task[]>(statisticsData);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (!newTask.trim()) {
      alert('Please enter a task');
      return;
    }
    const newTaskObj: Task = { id: tasks.length + 1, task: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  return (
    <MainCard title="Sub Task List">
      <div className="mb-3">
        <InputGroup>
          <Form.Control
            className="add_task_todo"
            value={newTask}
            required
            onChange={handleInputChange}
            placeholder="Create your task list"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="secondary" onClick={addTask}>
            <i className="ti ti-plus" />
          </Button>
        </InputGroup>
      </div>
      <div className="new-task">
        {tasks.map((task) => (
          <div key={task.id} className="to-do-list mb-3">
            <div className="float-end">
              <a onClick={() => deleteTask(task.id)} className="delete_todolist">
                <i className="ti ti-trash" />
              </a>
            </div>
            <div className="d-inline-block">
              <FormCheck className="check-task">
                <FormCheck.Input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  id={`customCheck${task.id}`}
                />
                <FormCheck.Label className={task.completed ? 'done-task' : ''} htmlFor={`customCheck${task.id}`}>
                  {task.task}
                </FormCheck.Label>
              </FormCheck>
            </div>
          </div>
        ))}
      </div>
    </MainCard>
  );
}
