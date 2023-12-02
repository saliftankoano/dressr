import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Test() {
  return (
    <Container fluid>
      <Row>
        <Col className='m-2 p-2'>1 of 3</Col>
        <Col xl={6} className='m-2 p-2'>2 of 3 (wider)</Col>
        <Col className='m-2 p-2'>3 of 3</Col>
      </Row>
      <br/>
      <Row>
        <Col className='m-2 p-2'>1 of 3</Col>
        <Col xl={5} className='m-2 p-2'>2 of 3 (wider)</Col>
        <Col className='m-2 p-2'>3 of 3</Col>
      </Row>
    </Container>
  );
}

export default Test;