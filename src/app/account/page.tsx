import AuthGuard from "../guard/auth-guard";
import MyAccountPage from "./MyAccountPage";

export default function AccountLayout() {
  return (
    <AuthGuard>
      <MyAccountPage />
    </AuthGuard>
  );
}
