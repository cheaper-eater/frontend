const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to get the details of the address location
 * @param {JSON} address is the json of the address we received from the autocompleteLocation() call
 * @returns the JSON of the details of the address json we inputted as an argument
 */
const detailLocation = async (address) => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/detail/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    })
  ).json();
};

/**
 * The API call to backend to get the details of the address location
 * @param {JSON} store is the json ids of the store we received from the search() call
 * @returns the JSON of the details of the store json we inputted as an argument
 */
const detailStore = async (store) => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/detail/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    })
  ).json();
};

export { detailLocation, detailStore };
