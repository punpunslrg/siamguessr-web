const Hero = () => {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="hero  ">
        <div className="hero-content flex-col lg:flex-row-reverse mt-34">
          <img
            src="https://picsum.photos/id/77/200/300"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold ">!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="hero background">
        <div className="hero-content flex-col lg:flex-row text-white">
          <img
            src="https://picsum.photos/id/84/200/300"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">!!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
