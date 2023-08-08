const Starbucket = ({ count }) => {
  //   const stars = document.getElementsByClassName("star");
  //   if (count.length > 45) {
  //     Array.from(stars).forEach((star) => {
  //       star.style.fontSize = "0.5em";
  //     });
  //   }

  return (
    <div id="starbucket">
      {Array.from({ length: count }, (x, index) => (
        <span
          className="star"
          key={index}
          role="img"
          aria-label="sheep"
          style={{
            display: "inline-block",
            transform: "rotate(-180deg)",
            /*fontSize: window.innerWidth < 700 ? "0.5em" : "1em", */
          }}
        >
          ⭐️
        </span>
      ))}
    </div>
  );
};
export default Starbucket;
