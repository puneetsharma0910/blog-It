import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    // If route requires authentication and user is not logged in
    if (authentication && !authStatus) {
      navigate("/login");
    }
    // If route should be accessed only by unauthenticated users (like login/signup)
    else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <div>...loading</div> : <>{children}</>;
}
