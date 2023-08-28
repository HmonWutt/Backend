async function Putrequest(url, body) {
  console.log("put request to", url);
  console.log("body", JSON.stringify(body));
  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export default Putrequest;
