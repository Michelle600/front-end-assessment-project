import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TodoCard from '../componenets/TodoCard';

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  const [filter, setFilter] = useState('all');

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <Container>
      <h1 className="my-3 text-center">Todo Project List!</h1>

      {/* Filter Buttons */}
      <div className="mb-3">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          onClick={() => setFilter('completed')}
          className="ms-2"
        >
          Completed
        </Button>
        <Button
          variant={filter === 'incomplete' ? 'primary' : 'secondary'}
          onClick={() => setFilter('incomplete')}
          className="ms-2"
        >
          Incomplete
        </Button>
      </div>

      <Row>
        {filteredTodos.map((todo) => (
          <Col md={4} key={todo.id}>
            <TodoCard todo={todo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
