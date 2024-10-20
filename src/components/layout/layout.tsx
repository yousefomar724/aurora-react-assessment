import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./navigation";
import Loader from "../shared/loader";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
