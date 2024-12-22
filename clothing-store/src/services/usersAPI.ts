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

const usersAPI = { login, register };
export default usersAPI;
