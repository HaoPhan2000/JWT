import { useContext } from "react";
import { InfoContext } from "../context/infoContext";

const HomePage = () => {
  const { info } = useContext(InfoContext);

  return (
    <div className="mainContainer">
      <strong>JWT homePage</strong>
      {!info.isLogin && (
        <div>
          <p>Đăng nhập để trải nghiệm</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
