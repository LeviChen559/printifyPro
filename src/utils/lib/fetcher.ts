export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    // include status and server message to help debugging
    const serverMessage =
    
      body && typeof body === "object" && "message" in body
        ? (body as any).message
        : body;
    throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(serverMessage)}`);
  }

  return body;
};

    