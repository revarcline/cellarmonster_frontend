import React from 'react';
import { useSelector } from 'react-redux';
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

    need to control my multple selects
    or? maybe see what the data looks like

*/

const BottleForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { ...props.defaults },
  });

  const { bins, countries, varietals, producers } = useSelector((state) => state.attributes);

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

  return (
    <div>
      <h1 style={{ paddingTop: '1em' }}>{props.mode === 'edit' ? 'Edit ' : 'New '}Bottle</h1>
      <Form style={{ textAlign: 'left' }} onSubmit={handleSubmit(props.onSubmit)}>
        {/*
         *
         ********** Name
         *
         */}
        <FormGroup style={{ paddingBottom: '1em' }}>
          <FormLabel>Name: </FormLabel>
          <FormControl name="name" type="text" placeholder="Label Name" {...register('name')} />
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
              <FormControl name="country_id" as="select" type="select" {...register('country_id')}>
                {countryOptions()}
              </FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup style={{ paddingBottom: '1em' }}>
              <FormLabel>Other Country (not listed): </FormLabel>
              <FormControl
                name="new_country"
                type="text"
                placeholder="Country of origin"
                {...register('new_country')}
              />
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
              <FormControl
                name="producer_id"
                as="select"
                type="select"
                {...register('producer_id')}
              >
                {producerOptions()}
              </FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup style={{ paddingBottom: '1em' }}>
              <FormLabel>Other Producer (not listed): </FormLabel>
              <FormControl
                name="new_producer"
                type="text"
                placeholder="Wine Producer"
                {...register('new_producer')}
              />
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
          <FormControl
            name="appellation"
            type="text"
            placeholder="AVA, AOC, DOCG, etc."
            {...register('appellation')}
          />
        </FormGroup>

        {/*
         *
         ********** Region
         *
         */}
        <FormGroup style={{ paddingBottom: '1em' }}>
          <FormLabel>Region: </FormLabel>
          <FormControl
            name="region"
            type="text"
            placeholder="eg. Bordeaux, California, etc."
            {...register('region')}
          />
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
              <FormControl
                name="varietals"
                as="select"
                type="select"
                multiple
                {...register('varietals')}
              >
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
                {...register('new_varietal')}
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
              <FormControl as="select" type="select" name="color" {...register('color')}>
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
              <input
                type="checkbox"
                name="sparkling"
                label="Sparkling"
                {...register('sparkling')}
              />
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
              <FormControl name="vintage" as="select" type="select" {...register('vintage')}>
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
              <FormControl name="format" as="select" type="select" {...register('format')}>
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
              <FormControl name="inventory" type="number" {...register('inventory')} />
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
              <FormControl
                name="sku"
                type="text"
                placeholder="Unique Stock Keeping Unit"
                {...register('sku')}
              />
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
                <FormControl name="price" type="text" placeholder="0.00" {...register('price')} />
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
              <FormControl name="bins" as="select" type="select" multiple {...register('bins')}>
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
          <FormControl
            as="textarea"
            name="notes"
            type="textarea"
            placeholder="Tasting Notes"
            {...register('notes')}
          />
        </FormGroup>
        <Button type="submit">
          {props.mode === 'new' ? 'Create Bottle' : 'Update Bottle Info'}
        </Button>
      </Form>
    </div>
  );
};

export default BottleForm;
