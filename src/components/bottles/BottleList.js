import React from 'react';
import { connect } from 'react-redux';
import { getBottles } from '../../actions/bottles';
import BottleCard from './BottleCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

class BottleList extends React.Component {
  componentDidMount() {
    this.props.getBottles;
  }

  generateCards = () => {
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
    if (this.props.loading === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (this.props.loading === 'finished') {
      return this.generateCards();
    }
  };

  resourceName = () => {
    if (this.props.by === 'search') {
      return `Search results for "${this.props.match.params.query}"`;
    } else if (this.props.by) {
      return `Bottles matching "${this.props.bottles.resource}"`;
    } else if (this.props.match.path === '/bottle/:query') {
      return null;
    } else {
      return 'All Bottles';
    }
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
          <Col xs="auto">{this.handleLoading()}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bottles: state.bottles,
    resource: state.resource,
    loading: state.bottles.bottleLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBottles: dispatch(getBottles(ownProps.by, ownProps.match.params.query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottleList);
