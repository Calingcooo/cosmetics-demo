import AuthGuard from "../guard/auth-guard";
import MyAccountPage from "./MyAccountPage";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <AuthGuard>
      <MyAccountPage />
    </AuthGuard>
  );
}
