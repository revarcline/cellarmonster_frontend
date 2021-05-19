import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBottle, getBottles } from '../../actions/bottles';
import { Spinner } from 'react-bootstrap';
import BottleForm from './BottleForm';

const EditBottle = (props) => {
  const dispatch = useDispatch();
  const handleGetBottles = async () =>
    await dispatch(getBottles('bottles', props.match.params.query));

  const dispatchUpdateBottle = async (data) => await dispatch(patchBottle(data));

  const {
    bottles: { bottles, bottleLoading },
  } = useSelector((state) => state);

  useEffect(() => {
    handleGetBottles();
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatchUpdateBottle(data, bottle.id);
  };

  const handleLoading = () => {
    if (bottleLoading === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (bottleLoading === 'finished') {
      const bottle = bottles[0].attributes;
      const initialValues = {
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
      return <BottleForm defaults={initialValues} onSubmit={onSubmit} />;
    }
  };

  return handleLoading();
};

export default EditBottle;
