import "./Navbar.css";
import { FormCreate } from "../forms/form";
import Modal from "react-modal";
import { useState } from "react";
import { CgCloseO } from "react-icons/cg";

const customStyle = {
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
};

Modal.setAppElement("#root");

export function Navbar({ createXmen }) {
  const [statusModal, setStatusModal] = useState(false);

  function closeModal() {
    setStatusModal(!statusModal);
  }

  return (
    <div>
      <nav className="nav__navbar">
        <ul className="ul__navbar">
          <li
            className="navbar__opcoes-create"
            onClick={() => {
              closeModal();
            }}
          >
            New
          </li>
        </ul>
      </nav>
      <section className="section_modal-geral-create">
        <Modal
          className="modal_create"
          isOpen={statusModal}
          onRequestClose={closeModal}
          contentLabel="create__details"
          style={customStyle}
        >
          <section className="section__modal-opcoes">
            <button className="button__modal-opcoes" onClick={closeModal}>
              <CgCloseO size={15} color="red" />
            </button>
            <FormCreate
              closeModal={closeModal}
              createXmen={(xmen) => createXmen(xmen)}
            />
          </section>
        </Modal>
      </section>
    </div>
  );
}
