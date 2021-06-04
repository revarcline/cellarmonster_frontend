import React from 'react';
import { useDispatch } from 'react-redux';
import { postBottle } from '../../features/bottles/bottleSlice';
import { useHistory, withRouter } from 'react-router-dom';
import BottleForm from './BottleForm';

const NewBottle = (props) => {
  const dispatch = useDispatch();
  const dispatchNewBottle = async (data) => await dispatch(postBottle(data));
  const history = useHistory();

  const initialValues = {
    name: '',
    country_id: '',
    new_country: '',
    producer_id: '',
    new_producer: '',
    appellation: '',
    region: '',
    varietals: [],
    new_varietal: '',
    color: 'Red',
    sparkling: false,
    price: parseFloat(Number(0)).toFixed(2),
    vintage: new Date().getFullYear(),
    notes: '',
    sku: '',
    bins: [],
    inventory: 0,
    format: '750 mL',
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatchNewBottle(data);
    history.push('/bottles');
  };

  return <BottleForm defaults={initialValues} onSubmit={onSubmit} mode="new" />;
};

export default withRouter(NewBottle);
