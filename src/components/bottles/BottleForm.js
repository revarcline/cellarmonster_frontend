import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBottle, patchBottle, getBottles } from '../../actions/bottles';
import { useForm } from 'react-hook-form';
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
  const dispatch = useDispatch();

  const handleGetBottles = async () =>
    await dispatch(getBottles('bottles', props.match.params.query));

  const dispatchNewBottle = async (data) => await dispatch(postBottle(data));
  const dispatchUpdateBottle = async (data) => await dispatch(patchBottle(data));

  useEffect(() => {
    handleGetBottles();
  }, []);

  //bins: state.attributes.bins,
  //countries: state.attributes.countries,
  //varietals: state.attributes.varietals,
  //producers: state.attributes.producers,
  //bottles: state.bottles,
  //bottle_id: state.bottles.bottles[0].id,
  const { bins, countries, varietals, producers } = useSelector((state) => state.attributes);
  const {
    bottles: { bottleLoading, bottles },
  } = useSelector((state) => state.bottles);

  //dispatchNewBottle: (bottle) => dispatch(postBottle(bottle)),
  //dispatchUpdateBottle: (bottle, id) => dispatch(patchBottle(bottle, id)),
  //getBottles: dispatch(getBottles('bottles', ownProps.match.params.query)),

  const formRef = useRef();

  const loadValues = () => {
    if (props.mode === 'edit') {
      bottle = bottles[0].attributes;
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
    const countriesList = [...countries, otherCountry];
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
    const producersList = [...producers, otherProducer];
    return producersList.map((producer) => {
      return (
        <option key={producer.attributes.id} value={producer.attributes.id}>
          {producer.attributes.name}
        </option>
      );
    });
  };

  const varietalOptions = () => {
    return varietals.map((varietal) => {
      return (
        <option key={varietal.attributes.id} value={varietal.attributes.id}>
          {varietal.attributes.name}
        </option>
      );
    });
  };

  const binOptions = () => {
    return bins.map((bin) => {
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
  const onSubmit = (data, event) => {
    const outputValues = { bottle: formRef.current.values };
    if (props.mode === 'new') {
      dispatchNewBottle(data);
    } else if (props.mode === 'edit') {
      dispatchUpdateBottle(data, bottle.id);
    }
  };

  const handleLoading = () => {
    return (
      <div>
        <h1 style={{ paddingTop: '1em' }}>{props.mode === 'edit' ? 'Edit ' : 'New '}Bottle</h1>
        <Form style={{ textAlign: 'left' }}>
          {/*
           *
           ********** Name
           *
           */}
          <FormGroup style={{ paddingBottom: '1em' }}>
            <FormLabel>Name: </FormLabel>
            <FormControl name="name" type="text" placeholder="Label Name" />
          </FormGroup>

          {/*
           *
           ********** Country ID
           *
           */}
          <Row>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Country: </FormLabel>
                <FormControl name="country_id" as="select" type="select">
                  {countryOptions()}
                </FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Other Country (not listed): </FormLabel>
                <FormControl name="new_country" type="text" placeholder="Country of origin" />
              </FormGroup>
            </Col>
          </Row>

          {/*
           *
           ********** Producer ID
           *
           */}
          <Row>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Producer: </FormLabel>
                <FormControl name="producer_id" as="select" type="select">
                  {producerOptions()}
                </FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Other Producer (not listed): </FormLabel>
                <FormControl name="new_producer" type="text" placeholder="Wine Producer" />
              </FormGroup>
            </Col>
          </Row>

          {/*
           *
           ********** Appellation
           *
           */}
          <FormGroup style={{ paddingBottom: '1em' }}>
            <FormLabel>Appellation: </FormLabel>
            <FormControl name="appellation" type="text" placeholder="AVA, AOC, DOCG, etc." />
          </FormGroup>

          {/*
           *
           ********** Region
           *
           */}
          <FormGroup style={{ paddingBottom: '1em' }}>
            <FormLabel>Region: </FormLabel>
            <FormControl name="region" type="text" placeholder="eg. Bordeaux, California, etc." />
          </FormGroup>

          {/*
           *
           ********** Varietals
           *
           */}
          <Row>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Varietals: </FormLabel>
                <FormControl name="varietals" as="select" type="select" multiple>
                  {varietalOptions()}
                </FormControl>
                <Form.Text>Control-Click to select multiple entries</Form.Text>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Other Varietal(s): </FormLabel>
                <FormControl
                  name="new_varietal"
                  type="text"
                  placeholder="Seperate with commas, eg. 'Pinot Noir, Gamay'"
                />
                <Form.Text>Seperate multiple entries with commas</Form.Text>
              </FormGroup>
            </Col>
          </Row>

          {/*
           *
           ********** Color
           *
           */}
          <Row>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Color: </FormLabel>
                <FormControl as="select" type="select" name="color">
                  <option value="Red">Red</option>
                  <option value="Rosé">Rosé</option>
                  <option value="White">White</option>
                </FormControl>
              </FormGroup>
            </Col>

            {/*
             *
             ********** Sparkling
             *
             */}
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <br />
                <input type="checkbox" name="sparkling" label="Sparkling" />
                {'  '}
                <FormLabel>Sparkling</FormLabel>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            {/*
             *
             ********** Vintage
             *
             */}
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Vintage: </FormLabel>
                <FormControl name="vintage" as="select" type="select">
                  {yearOptions()}
                </FormControl>
              </FormGroup>
            </Col>

            {/*
             *
             ********** Format
             *
             */}
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Format: </FormLabel>
                <FormControl name="format" as="select" type="select">
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
            </Col>
          </Row>

          {/*
           *
           ********** Inventory
           *
           */}
          <Row>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Inventory: </FormLabel>
                <FormControl name="inventory" type="number" />
                bottles
              </FormGroup>
            </Col>

            {/*
             *
             ********** SKU
             *
             */}
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>SKU: </FormLabel>
                <FormControl name="sku" type="text" placeholder="Unique Stock Keeping Unit" />
              </FormGroup>
            </Col>
          </Row>

          {/*
           *
           ********** Price
           *
           */}
          <Row>
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Price: </FormLabel>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl name="price" type="text" placeholder="0.00" />
                </InputGroup>
              </FormGroup>
            </Col>

            {/*
             *
             ********** Bins
             *
             */}
            <Col>
              <FormGroup style={{ paddingBottom: '1em' }}>
                <FormLabel>Bins: </FormLabel>
                <FormControl name="bins" as="select" type="select" multiple>
                  {binOptions()}
                </FormControl>
                <Form.Text>Control-Click to select multiple entries</Form.Text>
              </FormGroup>
            </Col>
          </Row>

          {/*
           *
           ********** Notes
           *
           */}
          <FormGroup style={{ paddingBottom: '1em' }}>
            <FormLabel>Notes: </FormLabel>
            <FormControl as="textarea" name="notes" type="textarea" placeholder="Tasting Notes" />
          </FormGroup>
          <Button type="submit">
            {props.mode === 'new' ? 'Create Bottle' : 'Update Bottle Info'}
          </Button>
        </Form>
      </div>
    );
  };

  return handleLoading();
};

export default BottleForm;
