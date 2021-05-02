import React from 'react';
import { connect } from 'react-redux';
import { getBottles } from '../../actions/bottles';
import BottleCard from './BottleCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

class BottleList extends React.Component {
  componentDidMount() {
    /*const by = this.props.by ? this.props.by : null;*/
    /*const query = this.props.query ? this.props.by : null;*/
    /*need to figure out how to send params to action*/
    this.props.getBottles();
  }

  generateCards = () => {
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
    bottles: state.bottles,
    loading: state.loading,
  };
};

export default connect(mapDispatchToProps, { getBottles })(BottleList);
