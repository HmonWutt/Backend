async function Putrequest(url, body, next) {
  console.log("put request to", url);
  console.log("body", JSON.stringify(body));
  try {
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    next();
  } catch (error) {
    console.error(error.message);
  }
}

export default Putrequest;
