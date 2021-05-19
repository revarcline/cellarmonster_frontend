import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBottle } from '../../actions/bottles';
import BottleForm from './BottleForm';

const NewBottle = (props) => {
  const dispatch = useDispatch();
  const dispatchNewBottle = async (data) => await dispatch(postBottle(data));

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
  };

  return <BottleForm defaults={initialValues} onSubmit={onSubmit} />;
};

export default NewBottle;
