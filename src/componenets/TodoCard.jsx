import { useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Form } from 'react-bootstrap';
import { TodoContext } from '../contexts/TodoContext';

export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? 'success' : 'danger';
  const badgeBg = completed ? 'success' : 'danger';
  const [timer, setTimer] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const [timerInterval, setTimerInterval] = useState(null);
  const setTodos = useContext(TodoContext).setTodos;

  const convertToSeconds = (minutes) => minutes * 60;

  // Timer Function
  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalID);
            setTimerInterval(null);
            alert(`Countdown for "${todo.title}" has ended!`);
            return 0;
          }
        });
      }, 1000);
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(convertToSeconds(inputValue));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const setInitialTimer = () => {
    setTimer(convertToSeconds(inputValue));
  };

  const deleteTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
    );
  };

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  // Convert seconds to minutes and seconds for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <Card border={border} className="my-3">
      <Card.Header className="text-center fw-bold">
        <Badge bg={badgeBg} className="mt-2">
          {!completed ? 'Not Completed' : 'Completed'}
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="mb-3">
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.details}</Card.Text>
          <p> Timer: {formatTime(timer)} </p>
        </div>
        <Form className="mb-3">
          <Form.Group>
            <Form.Label>Set Timer (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              min="1"
            />
            <Button onClick={setInitialTimer} className="mt-2">
              Set Timer
            </Button>
          </Form.Group>
        </Form>
        <div className="mt-auto">
          <Button onClick={startTimer}>
            <i className="bi bi-play"> </i>
          </Button>
          <Button onClick={pauseTimer} className="mx-2">
            <i className="bi bi-pause-fill"> </i>
          </Button>
          <Button onClick={resetTimer} className="mx-2">
            <i className="bi bi-arrow-clockwise"> </i>
          </Button>
          <Button variant="secondary" href={`todo/${todo.id}`} className="mx-2">
            <i className="bi bi-pencil"> </i>
          </Button>
          <Button variant="danger" onClick={deleteTodo} className="mx-2">
            <i className="bi bi-trash3"> </i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
