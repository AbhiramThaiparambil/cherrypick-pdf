import { refreshSession } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const useRefreshSession = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await refreshSession();
        setAccessToken(data.accessToken);
      } catch (error) {
        console.log("User not logged in");
      }
    };

    restoreSession();
  }, [setAccessToken]);
};

export default useRefreshSession;
