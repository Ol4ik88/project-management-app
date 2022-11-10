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

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  const data = (await response.json()) as T;
  return data;
};

export default request;
