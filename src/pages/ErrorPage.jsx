import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5 text-center ">
      <h1 className="my-3">Page not found</h1>
      <p>Sorry, the page you are looking for can't be found.</p>
      <Button variant="primary" onClick={goHome}>
        Back to Home
      </Button>
    </Container>
  );
}
