import { createContext, ReactNode, useContext, useState } from "react";
import { useEffect } from "react";
import { supabase } from "../libs/utils/supabaseClient";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
