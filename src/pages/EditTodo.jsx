import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

export default function EditTodo() {
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  const currentTodo = todos.filter((todo) => todo.id === id)[0];
  const [title, setTitle] = useState(currentTodo.title);
  const [details, setDetails] = useState(currentTodo.details);
  const [completed, setCompleted] = useState(currentTodo.completed);

  function updatedTodos(event) {
    event.preventDefault();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { id, title, details, completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    navigate('/todolist');
  }

  return (
    <Container>
      <h1 className="my-3">Edit Todo</h1>

      {/* Title */}
      <Form onSubmit={updatedTodos}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label> Title </Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Edit todo"
            required
          />
        </Form.Group>

        {/* Details */}

        <Form.Group className="mb-3" controlId="details">
          <Form.Label> Details </Form.Label>
          <Form.Control
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Edit details"
            required
          />
        </Form.Group>
        {/* Checkbox */}
        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mb-3"
        />

        {/* Button */}

        <Button variant="primary" type="submit">
          {' '}
          Submit{' '}
        </Button>
      </Form>
    </Container>
  );
}
