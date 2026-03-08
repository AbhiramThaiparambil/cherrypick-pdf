import { Navigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { APPROUTES } from "@/constant/routes";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to={APPROUTES.Landing} replace />;
  }

  return children;
};

export default ProtectedRoute;
