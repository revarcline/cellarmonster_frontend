import React from 'react';
import { connect } from 'react-redux';
import { getBottles } from '../../actions/bottles';
import BottleCard from './BottleCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

class BottleList extends React.Component {
  generateCards = () => {
    this.props.getBottles;
    console.log(this.props);

    if (this.props.bottles.bottles.length === 0) {
      return <h1>No Results</h1>;
    } else {
      return this.props.bottles.bottles.map(
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

  handleLoading = () => {
    if (this.props.loading) {
      return <Spinner animation="border" role="status" />;
    } else {
      return this.generateCards();
    }
  };

  resourceName = () => {
    return this.props.bottles.resource
      ? `Bottles matching "${this.props.bottles.resource}"`
      : 'All Bottles';
  };
  render() {
    return (
      <Container fluid className="pt-3">
        <Row>
          <Container fluid className="pt-3">
            <h2>{this.resourceName()}</h2>
          </Container>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg="6" md="8" sm="10" xs>
            {this.handleLoading()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bottles: state.bottles,
    resource: state.resource,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBottles: dispatch(getBottles(ownProps.by, ownProps.query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottleList);
