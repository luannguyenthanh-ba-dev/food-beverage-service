const axios = require('axios').default;

export function res(code: number, data: any) {
  return { status: 'Success', code: code, result: data };
}

export function pagination(page: string | number, lim: string | number) {
  const skip = Number(page) || 1;
  const limit = Number(lim) || 10;
  const start = limit * (skip - 1);

  return { start, limit };
}

export enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch',
}

interface IRequestData {
  // `headers` are custom headers to be sent
  headers?: any;
  // `params` are the URL parameters to be sent with the request - Must be a plain object or a URLSearchParams object
  params?: any;
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  data?: any;
  // `responseType` is the type of the response
  responseType?: any;
}

export function CrossInternalServicesHttpRequest(
  method: Methods,
  url: string,
  requestData?: IRequestData,
  //   apiKey?: string,
) {
  if (!requestData.headers) {
    requestData.headers = {};
  }
  //   requestData.headers['api-key'] = apiKey;
  //   Call to send alert api - no need result
  return axios({
    method,
    url,
    ...requestData,
  })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}
