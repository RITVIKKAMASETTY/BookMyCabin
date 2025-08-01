import React,{ useState }  from 'react'
import Button  from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";
// export default function AddCabin() {
//     const [showmodel, setmodelform] = useState(false);
//   return (
//     <>
//     <Button variation="primary" size="medium" onClick={() => setmodelform((show) => !show)}>Add new cabin</Button>
//     {showmodel&& <Modal setmodelform={setmodelform}><CreateCabinForm setmodelform={setmodelform}/></Modal>}
//     </>
//   )
// }
export default function AddCabin() {
  return(
    <div>
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Aadd a new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm/>
      </Modal.Window>
      {/* <Modal.Open opens="table">
        <Button>show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
       <CabinTable/>
      </Modal.Window> */}
    </Modal>
    </div>
  )
}