const baseUrl = "https://xmenapi.herokuapp.com/characters";

export const api = {
  createNewXmen: async (xmen) => {
    const response = await fetch(baseUrl + "/create-character", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(xmen),
    });
    const newXmen = await response.json();
    return newXmen;
  },

  getAll: async () => {
    const response = await fetch(baseUrl + "/all-characters");
    const xmens = await response.json();
    return xmens;
  },

  delete: async (id) => {
    const response = await fetch(baseUrl + "/delete-character/" + id, {
      method: "DELETE",
      headers: new Headers({ "content-type": "application/json" }),
    });
    const xmenDeleted = response.json();
    return xmenDeleted;
  },

  update: async (xmen) => {
    const response = await fetch(baseUrl + "/update-character/" + xmen.id, {
      method: "PATCH",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(xmen),
    });
    const xmenEdt = await response.json();
    return xmenEdt;
  },
};
