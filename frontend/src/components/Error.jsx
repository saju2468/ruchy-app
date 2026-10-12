import { useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="text-center text-2xl font-semibold flex flex-col items-center justify-center h-screen">
      <h1>{error.status} page not found : {error.statusText}</h1>
      <p className="text-lg font-normal">Something went wrong</p>
    </div>
  );
};

export default Error;
