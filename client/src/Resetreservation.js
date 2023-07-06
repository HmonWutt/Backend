const Resetreservation =()=> {
    
   const Reset = async () => {try {
  await fetch(`http://192.168.0.6:3000/todo/115`, {
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




