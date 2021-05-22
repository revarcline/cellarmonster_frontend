import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBottles } from '../../actions/bottles';
import BottleCard from './BottleCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const BottleList = (props) => {
  const dispatch = useDispatch();
  const handleGetBottles = async () =>
    await dispatch(getBottles(props.by, props.match.params.query));

  useEffect(() => {
    handleGetBottles();
  }, []);

  return (
    <div>
      <h1>this is a test</h1>
    </div>
  );

  //const {
  //bottles: { bottles, bottleLoading },
  //resource,
  //} = useSelector((state) => state);

  //const generateCards = () => {
  //if (bottles.length === 0) {
  //return <h1>No Results</h1>;
  //} else {
  //return bottles.map(
  //({
  //id,
  //attributes: {
  //country,
  //color,
  //sparkling,
  //price,
  //vintage,
  //appellation,
  //producer,
  //name,
  //notes,
  //sku,
  //inventory,
  //total_sold,
  //format,
  //bins,
  //region,
  //varietals,
  //},
  //}) => {
  //// any other data handling i need
  //return (
  //<BottleCard
  //key={id}
  //id={id}
  //country={country}
  //color={color}
  //sparkling={sparkling}
  //price={price}
  //vintage={vintage}
  //appellation={appellation}
  //producer={producer}
  //name={name}
  //notes={notes}
  //sku={sku}
  //inventory={inventory}
  //total_sold={total_sold}
  //format={format}
  //bins={bins}
  //region={region}
  //varietals={varietals}
  ///>
  //);
  //},
  //);
  //}
  //};

  //const handleLoading = () => {
  //if (bottleLoading === 'loading') {
  //return <Spinner animation="border" role="status" />;
  //} else if (bottleLoading === 'finished') {
  //return generateCards();
  //}
  //};

  //const resourceName = () => {
  //if (props.by === 'search') {
  //return `Search results for "${props.match.params.query}"`;
  //} else if (props.by) {
  //return `Bottles matching "${resource}"`;
  //} else if (props.match.path === '/bottle/:query') {
  //return null;
  //} else {
  //return 'All Bottles';
  //}
  //};

  //return (
  //<Container fluid className="pt-3">
  //<Row>
  //<Container fluid className="pt-3">
  //<h2>{resourceName()}</h2>
  //</Container>
  //</Row>

  //<Row className="justify-content-md-center">
  //<Col xs="auto">{handleLoading()}</Col>
  //</Row>
  //</Container>
  //);
};

export default BottleList;
