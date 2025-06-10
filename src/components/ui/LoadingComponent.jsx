import loading from "../../shared/loading.gif";

const LoadingComponent = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img
        alt="Loading..."
        src={loading}
        className="w-72 object-contain"
      />
    </div>
  );
};

export default LoadingComponent;