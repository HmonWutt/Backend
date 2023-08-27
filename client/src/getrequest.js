const Getrequest = async (url) => {
  console.log("get request to", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    return data;

    // const entries = document.querySelectorAll("#card");
    //   console.log(entries);
    //   entries && entries.forEach((element) => observer.observe(element));
  } catch (error) {
    console.error(error.message);
  }
};

export default Getrequest;
