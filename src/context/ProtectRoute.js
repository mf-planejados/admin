import Login from "../auth/login";
import { useRouter } from "next/router";
import { useAppContext } from "./AppContext";

export const ProtectRoute = ({ children }) => {
   const router = useRouter()

   // const notLoginScreen = router.asPath !== '/auth/login'

   const { isAuthenticated, loading } = useAppContext()

   if (!isAuthenticated) return <Login />;
   return children;
}