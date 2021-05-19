import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchBottle, getBottles } from '../../actions/bottles';
import { Spinner } from 'react-bootstrap';
import BottleForm from './BottleForm';

const EditBottle = (props) => {
  const dispatch = useDispatch();
  const handleGetBottles = async () =>
    await dispatch(getBottles('bottles', props.match.params.query));

  const dispatchUpdateBottle = async (data, id) => await dispatch(patchBottle(data, id));

  const {
    bottles: { bottles, bottleLoading },
  } = useSelector((state) => state);

  useEffect(() => {
    handleGetBottles();
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    const id = data.id;
    delete data.id;
    dispatchUpdateBottle(data, id);
    // push show bottle page in history when bottle is done posting
  };

  const handleLoading = () => {
    if (bottleLoading === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (bottleLoading === 'finished') {
      const bottle = bottles[0].attributes;
      const bottle_id = bottles[0].id;
      const initialValues = {
        id: bottle_id,
        name: bottle.name,
        country_id: bottle.country.id,
        new_country: '',
        producer_id: bottle.producer.id,
        new_producer: '',
        appellation: bottle.appellation,
        region: bottle.region,
        varietals: bottle.varietals.map((varietal) => varietal.id.toString()),
        new_varietal: '',
        color: bottle.color,
        sparkling: bottle.sparkling,
        price: bottle.price,
        vintage: bottle.vintage,
        notes: bottle.notes,
        sku: bottle.sku,
        bins: bottle.bins.map((bin) => bin.id.toString()),
        inventory: bottle.inventory,
        format: bottle.format,
      };
      return <BottleForm defaults={initialValues} onSubmit={onSubmit} mode="edit" />;
    }
  };

  return handleLoading();
};

export default EditBottle;
