import React from 'react';
import {
  Container, Row, Col, Card, ListGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { customSelectors } from '../slices/nuclsSlice.js';

const meltingTemperature = (count, a, t, c, g) => {
  const result = (count >= 13)
    ? (64.9 + (41 * (g + c - 16.4)) / (a + t + g + c)).toFixed(2)
    : (2 * (a + t) + (g + c) * 4);

  return result;
};

const Nucleotides = () => {
  const amount = useSelector(customSelectors.currentAmount);
  const allNucls = useSelector(customSelectors.allNucls);
  const nuclsA = useSelector(customSelectors.nuclsA).length;
  const nuclsT = useSelector(customSelectors.nuclsT).length;
  const nuclsC = useSelector(customSelectors.nuclsC).length;
  const nuclsG = useSelector(customSelectors.nuclsG).length;

  const temp = meltingTemperature(amount, nuclsA, nuclsT, nuclsC, nuclsG);

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md="10" className="mx-auto text-white">
          <Card className="border-0">
            <span><i>{`Темпепарута плавления: ${temp}`}</i></span>
            <Card.Body className="border-0 p-0 d-flex flex-wrap">
              <ListGroup
                as="ul"
                horizontal
                className="d-flex flex-wrap"
              >
                {allNucls.map(({
                  id, nucl, pair, picture,
                }) => (
                  <ListGroup.Item
                    as="li"
                    key={id}
                    className="align-items-center border-0"
                  >
                    {nucl}
                    <br />
                    {picture}
                    <br />
                    {pair}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Nucleotides;
