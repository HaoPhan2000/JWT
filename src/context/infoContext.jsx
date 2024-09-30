import { useState, createContext } from "react";
const InfoContext = createContext();
function InfoProvider({ children }) {
  const [info, setInfo] = useState({
    isLogin: false,
    user: { email: "" },
  });
  const [loading,setLoading]=useState(true)
  return (
    <InfoContext.Provider value={{ info, setInfo,loading,setLoading }}>
      {children}
    </InfoContext.Provider>
  );
}
export { InfoContext, InfoProvider };
