import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, FormGroup, FormLabel, InputGroup, Row, Col } from 'react-bootstrap';

/*
    name - input
    country - inputGroup select + readonly entry until other
    producer - inputGroup select + readonly entry until other
    appellation - input
    region - input
    color - select
    sparkling - checkbox
    price, validate to precision: 10, scale: 2 and have $ in inputgroup
    vintage - year selector?
    notes - textarea
    sku - input
    inventory - integer validated input
    format - select

TODO: reducers to get countries, varietals, producers, bins.
will find_or_create in the meantime

*/

const BottleForm = (props) => {
  // probably logic to map props from editable object here
  const initVal =
    props.mode === 'new'
      ? {
          name: '',
          country: '',
          producer: '',
          appellation: '',
          region: '',
          varietals: [],
          color: 'Red',
          sparkling: false,
          price: Number(0).toFixed(2),
          vintage: new Date().getFullYear(),
          notes: '',
          sku: '',
          bins: [],
          inventory: 0,
          format: '750 mL',
        }
      : {
          name: props.name,
          country: props.country.name,
          producer: props.producer.name,
          appellation: props.appellation,
          region: props.region,
          varietals: props.varietals.map((varietal) => varietal.id),
          color: props.color,
          sparkling: props.sparkling,
          price: props.price,
          vintage: props.vintage,
          notes: props.notes,
          sku: props.sku,
          bins: props.bins.map((bin) => bin.id),
          inventory: props.inventory,
          format: props.format,
        };
  const handleSubmit = (event) => {
    event;
  };

  return (
    <div>
      <h1>{props.mode === 'edit' ? 'Edit ' : 'New '}Bottle</h1>
      <Formik initialValues={initVal}>
        <Form style={{ textAlign: 'left' }}>
          <Field name="name">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Name: </FormLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Label Name"
                />
              </FormGroup>
            )}
          </Field>
          <Field name="country">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Country: </FormLabel>
                <FormControl
                  name="country"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Country of origin"
                />
              </FormGroup>
            )}
          </Field>
          <Field name="producer">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Producer: </FormLabel>
                <FormControl
                  name="producer"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Wine Producer"
                />
              </FormGroup>
            )}
          </Field>
          <Field name="appellation">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Appellation: </FormLabel>
                <FormControl
                  name="appellation"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="AVA, AOC, DOCG, etc."
                />
              </FormGroup>
            )}
          </Field>
          <Field name="region">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Region: </FormLabel>
                <FormControl
                  name="region"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="eg. Bordeaux, California, etc."
                />
              </FormGroup>
            )}
          </Field>
          <Field name="varietals">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Varietals: </FormLabel>
                <FormControl
                  name="varietals"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Seperate with commas, eg. 'Cabernet Sauvignon, Merlot, Malbec'"
                />
              </FormGroup>
            )}
          </Field>
          <Row>
            <Col>
              <Field name="color">
                {({ field, formProps }) => (
                  <FormGroup style={{ paddingBottom: '1em' }}>
                    <FormLabel>Color: </FormLabel>
                    <FormControl
                      as="select"
                      type="select"
                      name="color"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="Red">Red</option>
                      <option value="Rosé">Rosé</option>
                      <option value="White">White</option>
                    </FormControl>
                  </FormGroup>
                )}
              </Field>
            </Col>
            <Col>
              <Field name="sparkling">
                {({ field, formProps }) => (
                  <FormGroup style={{ paddingBottom: '1em' }}>
                    <br />
                    <input
                      type="checkbox"
                      name="sparkling"
                      label="Sparkling"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <br />
                    <FormLabel>Sparkling</FormLabel>
                  </FormGroup>
                )}
              </Field>
            </Col>
          </Row>
          <Field name="inventory">
            {({ field, formProps }) => (
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Inventory: </FormLabel>
                <FormControl
                  name="inventory"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormGroup>
            )}
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

export default BottleForm;
