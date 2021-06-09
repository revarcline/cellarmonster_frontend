import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchBottle, getBottles } from '../../features/bottles/bottleSlice';
import { withRouter, useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import BottleForm from './BottleForm';

const EditBottle = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleGetBottles = async () =>
    await dispatch(getBottles('bottles', props.match.params.query));

  const dispatchUpdateBottle = async (data, id) => await dispatch(patchBottle(data, id));

  const {
    bottles: { bottleList },
  } = useSelector((state) => state);

  useEffect(() => {
    handleGetBottles();
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    const id = data.id;
    delete data.id;
    dispatchUpdateBottle({ data, id });
    history.push(`/bottle/${id}`);
  };

  const handleLoading = () => {
    console.log(props);
    if (bottleList.status !== 'finished') {
      return <Spinner animation="border" role="status" />;
    } else if (bottleList.status === 'finished') {
      const bottle = bottleList.data[0].attributes;
      const bottle_id = bottleList.data[0].id;
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

export default withRouter(EditBottle);
