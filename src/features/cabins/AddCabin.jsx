import Button from "../../ui/Button";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";
import Modal from "../../ui/Modal";

// Compound Component version of Modal component
function AddCabin() {
  // State to decide if Modal is open or closed should be kept encapsulated inside Modal component - will then make Modal component easily shareable in app
  return (
    <div>
      <Modal>
        {/* Pass in opens prop to connect component to a window component so it knows which window to open and close */}
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      {/* <Modal.Open opens="table">
        <Button>Edit cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
