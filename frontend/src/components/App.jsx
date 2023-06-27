import React from 'react';
import { Container, Row } from 'react-bootstrap';

import FormCard from './FormCard.jsx';
import Nucleotides from './Nucleotides.jsx';

const App = () => (
  <>
    <Container fluid className="p-4">
      <Row>
        <FormCard />
      </Row>
    </Container>
    <Nucleotides />
  </>
);

export default App;
