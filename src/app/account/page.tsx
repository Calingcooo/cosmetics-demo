import { Suspense } from "react";
import AuthGuard from "../../guard/auth-guard";
import MyAccountPage from "./MyAccountPage";
import MyAccountSkeleton from "@/components/ui/loading/AccountPageSkeleton";

export default function AccountLayout() {
  return (
    <AuthGuard>
      <Suspense fallback={<MyAccountSkeleton />}>
        <MyAccountPage />
      </Suspense>
    </AuthGuard>
  );
}
