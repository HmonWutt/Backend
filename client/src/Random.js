const Random = () => {
  let random = (Math.random() + 1).toString(36).substring(7);

  return <div>{random}</div>;
};
export default Random;
