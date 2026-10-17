import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Offline from "./Offline.jsx";
import useOnlineStatus from "./useOnlineStatus.jsx";
import { Outlet } from "react-router";
import userContext from "../utilities/userContext.jsx";
import { Provider } from "react-redux";
import appStore from "../utilities/appStore.jsx";

const AppLayout = () => {
  const isOnline = useOnlineStatus();
  const [userName, setUserName] = useState("sajin");

  useEffect(() => {
    const data = {
      name: "sajin",
    };
    setUserName(data.name);
  }, []);

  if (!isOnline) {
    return <Offline />;
  }

  return (
    <>
      <Provider store={appStore}>
        <userContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <Outlet />
        </userContext.Provider>
      </Provider>
    </>
  );
};

export default AppLayout;
