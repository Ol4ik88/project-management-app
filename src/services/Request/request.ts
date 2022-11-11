const allowedStatusCode = [200, 400, 401, 404, 409];

const request = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: string,
  headers: {
    'Content-type'?: string;
    Authorization?: string;
    Accept?: string;
  } = { 'Content-type': 'application/json' }
) => {
  const response = await fetch(url, { method, body, headers });

  if (allowedStatusCode.indexOf(response.status) === -1) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return (await response.json()) as T;
};

export default request;
