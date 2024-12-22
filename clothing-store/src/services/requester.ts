async function requester(method: any, url: string, data: any) {
  const options: {
    headers: { [key: string]: string };
    body?: string;
    method: string;
  } = {
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "GET",
  };

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  if (method !== "GET") {
    options.method = method;
  }
  const response = await fetch(url, options);

  if (response.status == 204) {
    return console.log(`User logged out`);
  }
  const isJSON = options.headers["Content-type"] == "application/json";
  const result = isJSON ? await response.text() : await response.json();

  if (!response.ok) {
    throw response;
  }
  return result;
}
export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");

const requesterAPI = {
  get,
  post,
  put,
  del,
};
export default requesterAPI;
