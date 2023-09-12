import { createContext, useState } from "react";

export const Authcontext = createContext({});

const AuthcontextProvider = ({ children }) => {
  const [isloggedin, setIsloggedin] = useState(false);

  return (
    <Authcontext.Provider value={{ isloggedin, setIsloggedin }}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthcontextProvider;
