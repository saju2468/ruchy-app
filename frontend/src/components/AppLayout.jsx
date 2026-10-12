import Header from "./Header.jsx";
import Offline from "./Offline.jsx";
import useOnlineStatus from "./useOnlineStatus.jsx";
import { Outlet } from "react-router";

const AppLayout = () => {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <Offline />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppLayout;
