import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  let content = "";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  content = (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );

  return <div>{content}</div>;
};

export default Main;
