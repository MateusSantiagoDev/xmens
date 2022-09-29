import "./form.css";
import { useState } from "react";
import { api } from "../../helpers/Api.js";

export function FormCreate({ closeModal, createXmen }) {
  const [newXmen, setNewXmen] = useState([]);

  async function formsSubmit(event) {
    event.preventDefault();

    const renameImage = (img) => img.split("\\").pop();
    const { name, image1, ability, origin, image2 } = newXmen;

    const xmen = {
      name,
      image1: `assets/images/${renameImage(image1)}`,
      ability,
      origin,
      image2: `assets/images/${renameImage(image2)}`,
    };

    const response = await api.createNewXmen(xmen);
    createXmen(response);
    closeModal();
  }

  return (
    <div className="form">
      <form autoComplete="off" onSubmit={formsSubmit} className="form__xmen">
        <section>
          <span>Name: </span>
          <input
            type="text"
            name="name"
            required
            onChange={(event) => {
              setNewXmen({ ...newXmen, name: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Image: </span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            alt="image"
            onChange={(event) => {
              setNewXmen({
                ...newXmen,
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
              setNewXmen({ ...newXmen, ability: event.target.value });
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
              setNewXmen({ ...newXmen, origin: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Image Modal: </span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            alt="image"
            onChange={(event) => {
              setNewXmen({
                ...newXmen,
                image2: event.target.value,
              });
            }}
          ></input>
        </section>
        <button type="submit" className="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
