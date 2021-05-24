import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBottles } from '../../features/bottles/bottleSlice';
import BottleCard from './BottleCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, withRouter } from 'react-router-dom';

const BottleList = (props) => {
  const dispatch = useDispatch();
  const { by, term } = useParams();
  const handleGetBottles = async () => await dispatch(getBottles({ by, term }));

  useEffect(() => {
    handleGetBottles();
  }, []);

  const {
    bottles: {
      bottleList: { status, data, error, resource },
    },
  } = useSelector((state) => state);

  const generateCards = () => {
    if (data.length === 0) {
      return <h1>No Results</h1>;
    } else {
      return data.map(
        ({
          id,
          attributes: {
            country,
            color,
            sparkling,
            price,
            vintage,
            appellation,
            producer,
            name,
            notes,
            sku,
            inventory,
            total_sold,
            format,
            bins,
            region,
            varietals,
          },
        }) => {
          // any other data handling i need
          return (
            <BottleCard
              key={id}
              id={id}
              country={country}
              color={color}
              sparkling={sparkling}
              price={price}
              vintage={vintage}
              appellation={appellation}
              producer={producer}
              name={name}
              notes={notes}
              sku={sku}
              inventory={inventory}
              total_sold={total_sold}
              format={format}
              bins={bins}
              region={region}
              varietals={varietals}
            />
          );
        },
      );
    }
  };

  const handleLoading = () => {
    if (status === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (status === 'finished') {
      return generateCards();
    }
  };

  const resourceName = () => {
    if (by === 'search') {
      return `Search results for "${term}"`;
    } else if (by === 'bottle') {
      return null;
    } else if (by) {
      return `Bottles matching "${resource}"`;
    } else {
      return 'All Bottles';
    }
  };

  return (
    <Container fluid className="pt-3">
      <Row>
        <Container fluid className="pt-3">
          <h2>{resourceName()}</h2>
        </Container>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs="auto">{handleLoading()}</Col>
      </Row>
    </Container>
  );
};

export default withRouter(BottleList);
