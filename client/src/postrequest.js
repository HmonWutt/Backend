async function Postrequest(url, body) {
  try {
    const result = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      //Authorization: `Bearer ${token}`,
      body: JSON.stringify(body),
    });
    var response = await result.json();

    return response;
  } catch (error) {
    console.error(error.message);
  }
}

export default Postrequest;
