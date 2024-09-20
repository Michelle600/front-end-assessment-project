import { Container } from 'react-bootstrap';
import penguin from '../images/penguin.png';

export default function Home() {
  return (
    <Container>
      <h1 className="mt-5 mb-5 text-center">Welcome</h1>
      <br />
      <div style={{ width: '100%', display: 'block', textAlign: 'center' }}>
        <img
          src={penguin}
          alt="penguin"
          style={{ margin: '0 auto', display: 'block' }}
        />
      </div>
    </Container>
  );
}
