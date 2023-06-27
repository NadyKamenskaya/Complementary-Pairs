import React, { useEffect, useRef } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { actions, customSelectors } from '../slices/nuclsSlice';

const schema = () => yup.object().shape({
  body: yup
    .string()
    .max(100, 'Не более 100 символов')
    .matches(/^[ACGT]*$/, 'Неверный символ'),
});

const FormCard = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const amount = useSelector(customSelectors.currentAmount);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: schema(),
    validateOnBlur: false,
  });

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-content-center h-100">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <h1 className="text-center mb-4">Комплементарные пары</h1>
            <fieldset>
              <Form.Group
                className="mb-3 form-floating"
                controlId="body"
              >
                <Form.Control
                  ref={inputRef}
                  placeholder="Нуклеотидная цепочка"
                  name="body"
                  autoComplete="body"
                  required
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    const nucleotide = {
                      id: e.target.value.length,
                    };
                    switch (e.target.value.slice(-1)) {
                      case 'A':
                        nucleotide.nucl = 'A';
                        nucleotide.pair = 'T';
                        nucleotide.picture = '᎒᎒';
                        break;
                      case 'T':
                        nucleotide.nucl = 'T';
                        nucleotide.pair = 'A';
                        nucleotide.picture = '᎒᎒';
                        break;
                      case 'C':
                        nucleotide.nucl = 'C';
                        nucleotide.pair = 'G';
                        nucleotide.picture = '᎒᎒᎒';
                        break;
                      case 'G':
                        nucleotide.nucl = 'G';
                        nucleotide.pair = 'C';
                        nucleotide.picture = '᎒᎒᎒';
                        break;
                      default:
                        break;
                    }
                    if (e.target.value.length < amount) {
                      dispatch(actions.removeNucl(e.target.value.length));
                    } else {
                      dispatch(actions.addNucl(nucleotide));
                    }
                    dispatch(actions.changeAmount(e.target.value.length));
                    formik.handleChange(e);
                  }}
                  value={formik.values.body}
                  isInvalid={formik.errors.body}
                />
                <Form.Label>Нуклеотидная цепочка</Form.Label>
                <Form.Control.Feedback
                  type="invalid"
                  className="invalid-feedback"
                  tooltip
                >
                  {formik.errors.body}
                </Form.Control.Feedback>
              </Form.Group>
            </fieldset>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default FormCard;
