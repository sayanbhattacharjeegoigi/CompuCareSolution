import http from "./httpClient";

// POST without token
export const CallApi_Without_Token = async (apiPath: string, payload: any) => {
  const response = await http.post(apiPath, payload);
  return response.data;
};

// GET without token
export const CallApi_GET = async (apiPath: string, params?: object) => {
  const response = await http.get(apiPath, { params });
  return response.data;
};
