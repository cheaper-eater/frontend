import { getLocalStorage, setLocalStorage } from "./localStorage";

const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to get the popular restaurant suggestions of based on the user's location
 * @returns The JSON of with the 20 popular restaurants results from grubhub.
 */
// const popularPicks = async () => {
//   return await (
//     await fetch(`http://${API_DOMAIN}:${API_PORT}/api/popularPicks`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(await getLocalStorage("cookies")),
//     })
//   ).json();
// };

/**
 * The API call to backend to get the popular restaurant suggestions of based on the user's location
 * @returns The JSON of with the 20 popular restaurants results.
 */
const popularPicks = async () => {
  const cookies = await getLocalStorage("cookies");
  const res = await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: "",
        cookies: cookies.cookies,
      }),
    })
  ).json();
  await setLocalStorage("cookies", { ...cookies, ...res.cookies });
  return res.data.slice(0, 20);
};

export { popularPicks };
