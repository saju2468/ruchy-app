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

  if (!isOnline) {
    return <Offline />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userName, setUserName] = useState();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const data = {
      name: "sajin",
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserName(data.name);
  }, []);

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
