import React from 'react';
import { connect } from 'react-redux';
import { getBottles } from '../../actions/bottles';
import BottleCard from './BottleCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

class BottleList extends React.Component {
  componentDidMount() {
    this.props.getBottles(props.by, props.query);
  }

  generateCards = () => {
    return this.props.bottles.map(
      ({
        id,
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
        region,
        varietals,
      }) => {
        // any other data handling i need
        return (
          <BottleCard
            key={id}
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
            region={region}
            varietals={varietals}
          />
        );
      },
    );
  };

  handleLoading = () => {
    if (this.props.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return this.generateCards();
    }
  };

  generateCards = () => {
    return this.props.bottles.map(() => {
      return <BottleCard key={bottle.id} />;
    });
  };

  render() {
    return (
      <Container fluid className="pt-3">
        <Row className="justify-content-md-center">
          <Col lg="6" md="8" sm="10" xs>
            {this.handleLoading()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    bottles: state.bottles.bottles,
    loading: state.loading,
  };
};

export default connect(mapDispatchToProps, { getBottles })(BottleList);
