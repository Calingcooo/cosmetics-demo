import React from "react";
import AccountGuard from "../guard/auth-guard";

const MyAccountPage = () => {
  return (
    <AccountGuard>
      <div>My account</div>
    </AccountGuard>
  );
};

export default MyAccountPage;
