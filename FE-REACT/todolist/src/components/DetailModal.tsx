import React from "react";
import { Modal } from "react-bootstrap";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

type Props = {
  isOpen: boolean;
  todo: Todo | null;
  handleClose: () => void;
};

const DetailModal: React.FC<Props> = ({ isOpen, todo, handleClose }) => {
  return (
    <div>
      <Modal show={isOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Todo detail info</Modal.Title>
        </Modal.Header>
        <Modal.Body>{todo?.text}</Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailModal;
