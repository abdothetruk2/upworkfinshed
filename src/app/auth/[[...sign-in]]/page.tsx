import { SignIn } from "@clerk/nextjs";
import React from "react";

function AdminAuthenticationPage() {
  return (
    <>
      <div className="min-h-screen bg-main-section flex flex-col items-center justify-center">
        <SignIn />
      </div>
    </>
  );
}

export default AdminAuthenticationPage;
