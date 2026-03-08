import { APPROUTES } from "@/constant/routes";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.accessToken);
  if (token) {
    return <Navigate to={APPROUTES.Home} replace />;
  }

  return children;
};

export default AuthRoute;
