const Getrequest = async (url) => {
  console.log("this renders", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
