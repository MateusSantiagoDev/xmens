import "./XmenList.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { XmenData } from "../XmenData/XmenData";
import { api } from "../../helpers/Api";
import { CgCloseO } from "react-icons/cg";

let customStyle = {
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
};

Modal.setAppElement("#root");

function XMens({ createNewXmen }) {
  const [xmens, setXmen] = useState([]);
  const [xmenModal, setXmenModal] = useState(false);
  const [xmenUnique, setXmenUnique] = useState({});
  const [xmenEdted, setXmenEdted] = useState(false);
  const [xmenUpdate, setXmenUpdate] = useState([]);
  const [itensPage, setItensPage] = useState(8);
  const [correntPage, setCorrentPage] = useState(0);

  const pages = Math.ceil(xmens.length / itensPage);
  const startIndex = correntPage * itensPage;
  const endIndex = startIndex + itensPage;
  const xmenPages = xmens.slice(startIndex, endIndex);

  const newXmen = (xmen) => {
    const result = [...xmens, xmen];
    setXmen(result);
  };

  useEffect(() => {
    if (createNewXmen) newXmen(createNewXmen);
  }, [createNewXmen]);

  const getAll = async () => {
    const response = await api.getAll();
    setXmen(response);
  };

  const deleteXmen = (id) => {
    api.delete(id);
    const xmen = xmens;
    xmen.map((el, index) => {
      if (el.id === id) {
        xmen.splice(index, 1);
        setXmen(xmen);
      }
      modalState();
    });
  };

  function xmenUpdat(event) {
    event.preventDefault();

    const renameImage = (img) => img.split("\\").pop();

    const { name, image1, ability, origin, image2 } = xmenUpdate;
    const xmenEdt = {
      id: xmenUnique.id,
      name,
      image1: `assets/images/${renameImage(image1)}`,
      ability,
      origin,
      image2: `assets/images/${renameImage(image2)}`,
    };

    const xmen = xmens;

    xmen.map((el, index) => {
      if (el.id === xmenEdt.id) {
        xmen.splice(index, 1, xmenEdt);
      }
      modalState();
    });

    customStyle = {
      content: {
        width: "30rem",
        height: "550px",
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.4)",
      },
    };

    setXmen(xmen);
    setXmenEdted(false);
    api.update(xmenEdt);
  }

  function modalState() {
    setXmenModal(!xmenModal);
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="div__geral">
      <div className="xmenList">
        {xmenPages.map((xmen, index) => (
          <div className="xmenListData">
            <div>
              <div className="xmenListData__name">{xmen.name}</div>
              <img
                className="xmenListData__image"
                src={xmen.image1}
                alt="img"
              />
              <div className="xmenListaData__button">
                <button
                  className="button__ver--mais"
                  onClick={() => {
                    setXmenUnique(xmen);
                    modalState();
                  }}
                  key={index}
                >
                  Ver Mais
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="div__modal">
        <Modal
          className="modalStyle"
          isOpen={xmenModal}
          onRequestClose={modalState}
          contentLabel="xmen__details"
          style={customStyle}
        >
          <div className="div_geral-modal">
            {xmenEdted ? (
              <>
                <div>
                  <button
                    className="close__update"
                    onClick={() => {
                      setXmenEdted(false);
                      modalState();
                      customStyle = {
                        content: {
                          width: "30rem",
                          height: "550px",
                        },
                        overlay: {
                          background: "rgba(0, 0, 0, 0.4)",
                        },
                      };
                    }}
                  >
                    <CgCloseO size={15} color="red" />
                  </button>
                  <form
                    autoComplete="off"
                    onSubmit={xmenUpdat}
                    className="forms__Update"
                  >
                    <section>
                      <span>Name: </span>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={(event) => {
                          setXmenUpdate({
                            ...xmenUpdate,
                            name: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Image: </span>
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/gig, image/png, image/webp"
                        alt="image"
                        required
                        onChange={(event) => {
                          setXmenUpdate({
                            ...xmenUpdate,
                            image1: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Ability: </span>
                      <input
                        type="text"
                        name="ability"
                        required
                        onChange={(event) => {
                          setXmenUpdate({
                            ...xmenUpdate,
                            ability: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Origin: </span>
                      <input
                        type="text"
                        name="origin"
                        required
                        onChange={(event) => {
                          setXmenUpdate({
                            ...xmenUpdate,
                            origin: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Image Modal: </span>
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/gig, image/png, image/webp"
                        alt="image"
                        required
                        onChange={(event) => {
                          setXmenUpdate({
                            ...xmenUpdate,
                            image2: event.target.value,
                          });
                        }}
                      ></input>
                    </section>
                    <div className="div_submit-update">
                      <button type="submit" className="submit__update">
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <section className="section__modal">
                  <div className="div__button--modal">
                    <button className="button__modal" onClick={modalState}>
                      <CgCloseO size={15} color="red" />
                    </button>
                  </div>
                  <div className="div__itens--modal">
                    <XmenData />
                    <h2 className="h2Ability">Ability:</h2>
                    <h3 className="abilityH3">{xmenUnique.ability}</h3>
                    <h2 className="h2Origin">Origin:</h2>
                    <h3 className="originH3">{xmenUnique.origin}</h3>
                    <img className="imageModal" src={xmenUnique.image2} />
                  </div>
                </section>
                <div className="div_update-delete">
                  <button
                    className="button_update"
                    onClick={() => {
                      setXmenEdted(true);
                      customStyle = {
                        content: {
                          top: "12rem",
                          width: "15rem",
                          height: "15rem",
                        },
                        overlay: {
                          background: "rgba(0, 0, 0, 0.4)",
                        },
                      };
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="button_delete"
                    onClick={() => {
                      deleteXmen(xmenUnique.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>

      <div className="button__next">
        {Array.from(Array(pages), (itens, index) => {
          return (
            <button
              value={index}
              onClick={(event) => setCorrentPage(Number(event.target.value))}
              className="button__next--button"
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { XMens };
