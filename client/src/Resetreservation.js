import url from "./url"
const Resetreservation =()=> {
    
   const Reset = async () => {try {
  await fetch(`${url}/todo/115`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      set: `SET joakim_reserve = 'false' , hmon_reserve = 'false`,
    }),
  });
} catch (error) {
  console.error(error.message);
}
};Reset()}

export default Resetreservation;




