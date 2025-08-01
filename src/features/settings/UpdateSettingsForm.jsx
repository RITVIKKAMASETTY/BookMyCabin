import { useState } from 'react';
import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import useEditSettings from './useEditSettings';
function UpdateSettingsForm() {
  const {isPending,error,settings={}}=useSettings();
  const {minbookinglength,maxbookinglength,maxguetsperbooking,breakfastprice}=settings;
  console.log(minbookinglength,maxbookinglength,maxguetsperbooking,breakfastprice
  );
  const {editsettingss,isediting}=useEditSettings();
  function handleupdate(e,field){
    const {value}=e.target;
    if(!value)return;
    editsettingss({[field]:value});
  }
  if(isPending)return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minbookinglength} onBlur={(e)=>handleupdate(e,'minbookinglength')} disabled={isediting}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxbookinglength} onBlur={(e)=>handleupdate(e,'maxbookinglength')} disabled={isediting}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxguetsperbooking} onBlur={(e)=>handleupdate(e,'maxguetsperbooking')} disabled={isediting}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastprice} onBlur={(e)=>handleupdate(e,'breakfastprice')} disabled={isediting}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
