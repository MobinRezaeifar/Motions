import "./Error.css"
const Error = () => {
  return (
    <div id="bodyy">
      <div className="mars"></div>
      <img
        src="https://assets.codepen.io/1538474/404.svg"
        className="logo-404"
        alt=""
      />
      <img
        src="https://assets.codepen.io/1538474/meteor.svg"
        className="meteor"
        alt=""
      />
      <p className="title">Oh no!!</p>
      <p className="subtitle">
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </p>
      <div className="items-center">
        <a className="btn-back" href="/">
         Back To Register Page
        </a>
      </div>
      <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        className="astronaut"
        alt=""
      />
      <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        className="spaceship"
        alt=""
      />
    </div>
  );
};

export default Error;
