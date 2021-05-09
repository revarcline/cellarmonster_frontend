import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { Form as FormikForm } from 'formik';
import { postBottle, patchBottle, getBottles } from '../../actions/bottles';
import {
  FormControl,
  FormGroup,
  FormLabel,
  Form,
  InputGroup,
  Row,
  Col,
  Button,
  Spinner,
} from 'react-bootstrap';
import { range } from 'lodash-es';

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

  useEffect(() => {
    if (props.mode !== 'new') {
      props.getBottles;
    }
  });
  const formRef = useRef();

  const loadValues = () => {
    if (props.mode === 'edit') {
      let bottle = props.bottles.bottles[0].attributes;
      return {
        name: bottle.name,
        country_id: bottle.country.id,
        new_country: '',
        producer_id: bottle.producer.id,
        new_producer: '',
        appellation: bottle.appellation,
        region: bottle.region,
        varietals: bottle.varietals.map((varietal) => varietal.id),
        new_varietal: '',
        color: bottle.color,
        sparkling: bottle.sparkling,
        price: bottle.price,
        vintage: bottle.vintage,
        notes: bottle.notes,
        sku: bottle.sku,
        bins: bottle.bins.map((bin) => bin.id),
        inventory: bottle.inventory,
        format: bottle.format,
      };
    } else if (props.mode === 'new') {
      return {
        name: '',
        country_id: '',
        new_country: '',
        producer_id: '',
        new_producer: '',
        appellation: '',
        region: '',
        varietals: [],
        new_varietal: '',
        color: 'Red',
        sparkling: false,
        price: parseFloat(Number(0)).toFixed(2),
        vintage: new Date().getFullYear(),
        notes: '',
        sku: '',
        bins: [],
        inventory: 0,
        format: '750 mL',
      };
    }
  };

  const countryOptions = () => {
    const otherCountry = { attributes: { id: '', name: 'Other (fill in text field)' } };
    const countriesList = [...props.countries, otherCountry];
    return countriesList.map((country) => {
      return (
        <option key={country.attributes.id} value={country.attributes.id}>
          {country.attributes.name}
        </option>
      );
    });
  };

  const producerOptions = () => {
    const otherProducer = { attributes: { id: '', name: 'Other (fill in text field)' } };
    const producersList = [...props.producers, otherProducer];
    return producersList.map((producer) => {
      return (
        <option key={producer.attributes.id} value={producer.attributes.id}>
          {producer.attributes.name}
        </option>
      );
    });
  };

  const varietalOptions = () => {
    return props.varietals.map((varietal) => {
      return (
        <option key={varietal.attributes.id} value={varietal.attributes.id}>
          {varietal.attributes.name}
        </option>
      );
    });
  };

  const binOptions = () => {
    return props.bins.map((bin) => {
      return (
        <option key={bin.attributes.id} value={bin.attributes.id}>
          {bin.attributes.name}
        </option>
      );
    });
  };

  const yearOptions = () => {
    const nextYear = new Date().getFullYear() + 1;
    const yearList = range(1960, nextYear, 1);
    return yearList.map((year) => {
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    });
  };
  const handleSubmit = (event) => {
    const outputValues = { bottle: formRef.current.values };
    if (props.mode === 'new') {
      props.dispatchNewBottle(outputValues);
    } else if (props.mode === 'edit') {
      props.dispatchUpdateBottle(outputValues, props.bottle_id);
    }
    formRef.current.setSubmitting(false);
  };

  const handleLoading = () => {
    if (props.bottles.bottleLoading === 'loading' && props.mode !== 'new') {
      return <Spinner animation="border" role="status" />;
    } else if (props.bottles.bottleLoading === 'finished' || props.mode === 'new') {
      return (
        <div>
          <h1 style={{ paddingTop: '1em' }}>{props.mode === 'edit' ? 'Edit ' : 'New '}Bottle</h1>
          <Formik initialValues={loadValues()} innerRef={formRef} onSubmit={handleSubmit}>
            {(formProps) => (
              <FormikForm style={{ textAlign: 'left' }}>
                {/*
                 *
                 ********** Name
                 *
                 */}
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

                {/*
                 *
                 ********** Country ID
                 *
                 */}
                <Row>
                  <Col>
                    <Field name="country_id">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Country: </FormLabel>
                          <FormControl
                            name="country_id"
                            as="select"
                            type="select"
                            value={field.value}
                            onChange={field.onChange}
                          >
                            {countryOptions()}
                          </FormControl>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                  <Col>
                    <Field name="new_country">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Other Country (not listed): </FormLabel>
                          <FormControl
                            name="new_country"
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Country of origin"
                          />
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/*
                 *
                 ********** Producer ID
                 *
                 */}
                <Row>
                  <Col>
                    <Field name="producer_id">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Producer: </FormLabel>
                          <FormControl
                            name="producer_id"
                            as="select"
                            type="select"
                            value={field.value}
                            onChange={field.onChange}
                          >
                            {producerOptions()}
                          </FormControl>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                  <Col>
                    <Field name="new_producer">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Other Producer (not listed): </FormLabel>
                          <FormControl
                            name="new_producer"
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Wine Producer"
                          />
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/*
                 *
                 ********** Appellation
                 *
                 */}
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

                {/*
                 *
                 ********** Region
                 *
                 */}
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

                {/*
                 *
                 ********** Varietals
                 *
                 */}
                <Row>
                  <Col>
                    <Field name="varietals">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Varietals: </FormLabel>
                          <FormControl
                            name="varietals"
                            as="select"
                            type="select"
                            multiple
                            value={field.value}
                            onChange={field.onChange}
                          >
                            {varietalOptions()}
                          </FormControl>
                          <Form.Text>Control-Click to select multiple entries</Form.Text>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                  <Col>
                    <Field name="new_varietal">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Other Varietal(s): </FormLabel>
                          <FormControl
                            name="new_varietal"
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Seperate with commas, eg. 'Pinot Noir, Gamay'"
                          />
                          <Form.Text>Seperate multiple entries with commas</Form.Text>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/*
                 *
                 ********** Color
                 *
                 */}
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

                  {/*
                   *
                   ********** Sparkling
                   *
                   */}
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
                          {'  '}
                          <FormLabel>Sparkling</FormLabel>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row>
                  {/*
                   *
                   ********** Vintage
                   *
                   */}
                  <Col>
                    <Field name="vintage">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Vintage: </FormLabel>
                          <FormControl
                            name="vintage"
                            as="select"
                            type="select"
                            value={field.value}
                            onChange={field.onChange}
                          >
                            {yearOptions()}
                          </FormControl>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  {/*
                   *
                   ********** Format
                   *
                   */}
                  <Col>
                    <Field name="format">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Format: </FormLabel>
                          <FormControl
                            name="format"
                            as="select"
                            type="select"
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <option value="187.5 mL">187.5 mL (Split)</option>
                            <option value="375 mL">375 mL (Half)</option>
                            <option value="750 mL">750 mL (Standard)</option>
                            <option value="1 L">1 L</option>
                            <option value="1.5 L">1.5 L (Magnum)</option>
                            <option value="2.25 L">2.25 L (Marie-Jeanne)</option>
                            <option value="3 L">3 L (Double Magnum)</option>
                            <option value="5 L">5 L (Jeroboam)</option>
                            <option value="6 L">6 L (Imperiale)</option>
                            <option value="9 L">9 L (Salmanazar)</option>
                            <option value="12 L">12 L (Balthazar)</option>
                            <option value="15 L">15 L (Nebuchadnezzar)</option>
                            <option value="18 L">18 L (Melchior)</option>
                          </FormControl>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/*
                 *
                 ********** Inventory
                 *
                 */}
                <Row>
                  <Col>
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
                          bottles
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  {/*
                   *
                   ********** SKU
                   *
                   */}
                  <Col>
                    <Field name="sku">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>SKU: </FormLabel>
                          <FormControl
                            name="sku"
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Unique Stock Keeping Unit"
                          />
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/*
                 *
                 ********** Price
                 *
                 */}
                <Row>
                  <Col>
                    <Field name="price">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Price: </FormLabel>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              name="price"
                              type="text"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="0.00"
                            />
                          </InputGroup>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  {/*
                   *
                   ********** Bins
                   *
                   */}
                  <Col>
                    <Field name="bins">
                      {({ field, formProps }) => (
                        <FormGroup style={{ paddingBottom: '1em' }}>
                          <FormLabel>Bins: </FormLabel>
                          <FormControl
                            name="bins"
                            as="select"
                            type="select"
                            multiple
                            value={field.value}
                            onChange={field.onChange}
                          >
                            {binOptions()}
                          </FormControl>
                          <Form.Text>Control-Click to select multiple entries</Form.Text>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/*
                 *
                 ********** Notes
                 *
                 */}
                <Field name="notes">
                  {({ field, formProps }) => (
                    <FormGroup style={{ paddingBottom: '1em' }}>
                      <FormLabel>Notes: </FormLabel>
                      <FormControl
                        as="textarea"
                        name="notes"
                        type="textarea"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Tasting Notes"
                      />
                    </FormGroup>
                  )}
                </Field>
                <Button type="submit">
                  {props.mode === 'new' ? 'Create Bottle' : 'Update Bottle Info'}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </div>
      );
    }
  };

  return handleLoading();
};

const mapStateToProps = (state) => {
  return {
    bins: state.attributes.bins,
    countries: state.attributes.countries,
    varietals: state.attributes.varietals,
    producers: state.attributes.producers,
    bottles: state.bottles,
    bottle_id: state.bottles.bottles[0].id,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchNewBottle: (bottle) => dispatch(postBottle(bottle)),
    dispatchUpdateBottle: (bottle, id) => dispatch(patchBottle(bottle, id)),
    getBottles: dispatch(getBottles('bottles', ownProps.match.params.query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottleForm);
