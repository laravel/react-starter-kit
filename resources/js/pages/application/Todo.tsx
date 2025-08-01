import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import CardList from '@/sections/application/todo/CardList';
import TodoList from '@/sections/application/todo/TodoList';
import TodoListModel from '@/sections/application/todo/TodoListModel';

// ==============================|| APPLICATION - TO DO ||============================== //

export default function TodoPage() {
  return (
    <AppLayout>
      <Head title="Todo" />
      <Row className="row">
        <Col xl={6}>
          <CardList />
        </Col>
        <Col xl={6}>
          <TodoList />
        </Col>
        <Col sm={12}>
          <TodoListModel />
        </Col>
      </Row>
    </AppLayout>
  );
}
