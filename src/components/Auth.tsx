import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthProps {
  children: ReactNode;
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return <>{children}</>;
  } else {
    alert("You must be logged in to view this page.");

    return <Navigate to="/" />;
  }
};
