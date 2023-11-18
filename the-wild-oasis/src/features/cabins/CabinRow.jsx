import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import {
  deleteCabin as deleteCabinApi,
  createEditCabin,
} from "../../services/apiCabins";
import useCustomMutation from "../../hooks/useCustomMutation";
import CreateCabinForm from "./CreateCabinForm";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import { toast } from "sonner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

CabinRow.propTypes = {
  cabin: PropTypes.object,
  curOpen: PropTypes.number,
  setIsOpen: PropTypes.func,
};

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxGuests, price, discount, image, description } = cabin;

  const { isLoading: isDeleting, mutate: deleteCabin } = useCustomMutation(
    deleteCabinApi,
    ["cabins"]
  );

  const { mutate: copyCabin } = useCustomMutation(function (cabin) {
    return createEditCabin(cabin);
  });

  function handleDuplicate() {
    copyCabin(
      {
        name: `Copy of ${name}`,
        maxGuests,
        price,
        discount,
        image,
        description,
      },
      {
        onSuccess: () => {
          toast.success("Cabin successfully copied");
        },
      }
    );
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxGuests} guests</div>
      <Price>{formatCurrency(price)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "-"}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-form">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-form">
              <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>
            </Modal.Window>

            <Modal.Window name="delete-form">
              <ConfirmDelete
                onConfirm={() => {
                  deleteCabin(id, {
                    onSuccess: () => {
                      toast.success("Cabin successfully deleted");
                    },
                  });
                }}
                disabled={isDeleting}
                resourceName={"cabin"}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
