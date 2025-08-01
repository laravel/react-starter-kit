import React, { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const staticData: Task[] = [
  { id: 1, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been', completed: false },
  { id: 2, text: "the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", completed: false },
  { id: 3, text: 'of type and scrambled it to make a type specimen book. It has survived not only five', completed: false },
  { id: 4, text: 'centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', completed: false }
];

// ==============================|| TODO - TODO LIST MODEL ||============================== //

export default function TodoListModel() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(staticData);
  const [newTask, setNewTask] = useState<string>('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('please enter a task');
      return;
    }
    const newTaskObj = {
      id: tasks.length + 1,
      text: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    handleClose();
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <MainCard title="To Do List in Modal">
        <div className="tasks-widget">
          {tasks.map((task) => (
            <Stack key={task.id} direction="horizontal" className={`justify-content-between ${task.completed ? 'done-task' : ''}`}>
              <div className="d-inline-block ">
                <FormCheck className="check-task">
                  <FormCheck.Input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                  />
                  <FormCheck.Label className={task.completed ? 'done-task' : ''} htmlFor={`task-${task.id}`}>
                    {task.text}
                  </FormCheck.Label>
                </FormCheck>
              </div>
              <div className="float-end">
                <Button variant="link" onClick={() => handleDeleteTask(task.id)}>
                  <i className="ti ti-trash" />
                </Button>
              </div>
            </Stack>
          ))}
        </div>
        <Button onClick={handleShow} className="btn-add-task m-t-10">
          Add New Tasks
        </Button>
      </MainCard>

      <Modal show={show} onHide={handleClose} className="fade" id="flipFlop" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
        <ModalHeader closeButton>
          <ModalTitle id="modalLabel">Add new todo</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <Form>
                <div className="mb-3 form-primary">
                  <Form.Control type="text" value={newTask} onChange={handleTaskChange} placeholder="Create your task list" required />
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddTask} variant="light-primary">
            Add
          </Button>
          <Button onClick={handleClose} variant="light-secondary">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
