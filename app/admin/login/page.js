import { Suspense } from "react";
import AdminLogin from "./Loginclient";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <AdminLogin />
    </Suspense>
  );
}
