import requesterAPI from "./requester";

const BASE_URL = "http://localhost:3000";

async function login(email: string, password: string) {
  const resp = await requesterAPI.post(BASE_URL + "/auth/login", {
    email,
    password,
  });
  return resp;
}
async function register(email: string, password: string) {
  const resp = await requesterAPI.post(BASE_URL + "/auth/register", {
    email,
    password,
  });
  return resp;
}

async function getStatus(accessToken: string) {
  const resp = await fetch(BASE_URL + "/auth/status", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp;
}

const usersAPI = { login, register, getStatus };
export default usersAPI;
