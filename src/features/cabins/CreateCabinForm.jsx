import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import {Textarea} from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import { createeditCabin } from "../../services/apiCabins";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";
import useCreate from "./useCreate";
import useEdit from "./useEdit";
// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({cabinToEdit={},onCloseModal}) {
  const {id:editId,...editValues}= cabinToEdit;
  const isEditSession=Boolean(editId);
  const {register, handleSubmit,reset,getValues,formState} = useForm({
    defaultValues:isEditSession?editValues:{}
  });
  const {errors} = formState;
  console.log("errors",errors);
  // const {mutate:createcabin,isPending:isCreating}= useMutation({
  //   mutationFn:(data)=>createeditCabin(data),
  //   onSuccess:()=>{toast.success("Cabin created");queryClient.invalidateQueries({queryKey:['cabins']});reset();},
  //   onError:(err)=>toast.error(err.message)
  // })
  const {createcabin,isCreating}= useCreate();
// const {mutate:editcabin,isPending:isEditing}= useMutation({
//     mutationFn:({data,editId})=>createeditCabin(data,editId),
//     onSuccess:()=>{toast.success("Cabin updated");queryClient.invalidateQueries({queryKey:['cabins']});reset();},
//     onError:(err)=>toast.error(err.message)
//   })
const {editcabin,isEditing}=useEdit();

  function onSubmit(data) {
    const image=typeof data.image==="string"?data.image:data.image[0];
    console.log(image);
    if(isEditSession){
      editcabin({data:{...data, image:image}, editId},{
        onSuccess:(data)=>{reset();if(onCloseModal)onCloseModal();},
      });
    }
    else{
    createcabin({...data,image:image},{
      onSuccess:(data)=>{reset();if(onCloseModal)onCloseModal();}
    });
    }
  }
  function onError(error){
    console.log(error);
  }
const isWorking=isCreating||isEditing;
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal?"modal":"regular"}>
      <FormRow label="name" error={errors?.name?.message}  id="name">
        <Input type="text" disabled={isWorking} id="name"{...register("name",{required:"this field is required"})}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}  id="maxCapacity">
        <Input type="number" disabled={isWorking} id="maxCapacity" {...register("maxCapacity",{required:"this field is required",min:{value:1,message:"Capacity should be at least 1"}})}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}  id="regularPrice">
        <Input type="number" disabled={isWorking}id="regularPrice" {...register("regularPrice",{required:"this field is required",min:{value:1,message:"Price should be at least 1"}})}/>
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}  id="discount">
        <Input type="number" disabled={isWorking} id="discount" defaultValue={0}{...register("discount",{required:"this field is required",validate:(value)=>value<=getValues().regularPrice||{message:`Discount should be less than${getValues().regularPrice}`}})}/>
      </FormRow>
      
      <FormRow label="Description for website" error={errors?.description?.message} id="description">
        <Textarea type="number" disabled={isWorking} id="description" defaultValue="" {...register("description",{required:"this field is required"})}/>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message} id="image">
        <FileInput id="image" disabled={isWorking} accept="image/*"{...register("image",{required:isEditSession?false:"this field is required"})}/>
        {errors?.name?.message && <Error>{errors?.image?.message}</Error>}
        
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={onCloseModal} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession?"update cabin":"create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
