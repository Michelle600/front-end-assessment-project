import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [completed, setCompleted] = useState(false);
  const { setTodos, todos } = useContext(TodoContext);
  const navigate = useNavigate();

  function addTodo(event) {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), title, details, completed }]);
    navigate('/todolist');
  }

  return (
    <Container>
      <h1 className="my-3">Add Todo</h1>

      <Form onSubmit={addTodo}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label> Title </Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add your todo"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="details">
          <Form.Label> Details </Form.Label>
          <Form.Control
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Details"
            required
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mb-3"
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
