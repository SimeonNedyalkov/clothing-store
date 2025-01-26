const BASE_URL = "http://localhost:3000";

async function getAllClothes() {
  try {
    const resp = await fetch(`${BASE_URL}/clothes`);
    const resp1 = resp.json();
    return resp1;
  } catch (err) {
    console.error(err);
  }
}

const clothesAPI = { getAllClothes };

export default clothesAPI;
