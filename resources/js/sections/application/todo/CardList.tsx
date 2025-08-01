import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/CardHeader';
import CardBody from 'react-bootstrap/CardBody';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const staticData: Task[] = [
  { id: 1, text: 'Lorem Ipsum Dolor Sit Amet', completed: false },
  { id: 2, text: 'Lorem Ipsum Dolor Sit Amet', completed: false },
  { id: 3, text: 'Lorem Ipsum Dolor Sit Amet', completed: false },
  { id: 4, text: 'Lorem Ipsum Dolor Sit Amet', completed: false }
];

// ==============================|| TODO - CARD LIST ||============================== //

export default function CardList() {
  const [tasks, setTasks] = useState<Task[]>(staticData);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('please enter a task');
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <Card>
      <CardHeader>
        <h5>To Do Card List</h5>
      </CardHeader>
      <CardBody className="py-3 border-bottom">
        <InputGroup>
          <Form.Control
            type="text"
            name="task-insert"
            placeholder="Create your task list"
            required
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant="secondary" id="create-task" onClick={addTask}>
            <i className="ti ti-plus" />
          </Button>
        </InputGroup>
      </CardBody>
      <CardBody>
        <section id="task-container">
          <ul id="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? 'complete' : ''} onClick={() => toggleTaskCompletion(task.id)}>
                <p>{task.text}</p>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Button className="mb-0" onClick={clearAllTasks}>
              Clear All Tasks
            </Button>
          </div>
        </section>
      </CardBody>
    </Card>
  );
}
