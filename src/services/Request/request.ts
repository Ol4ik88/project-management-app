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
    const errorResponse = await response.json();
    throw new Error(
      `Could not fetch ${url}. ${errorResponse.message} (code: ${errorResponse.statusCode})`
    );
  }

  return (await response.json()) as T;
};

export default request;
