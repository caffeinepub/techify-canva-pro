import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import ThankYouPage from "./pages/ThankYouPage";
import { Toaster } from "@/components/ui/sonner";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const thankYouRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/thank-you",
  component: ThankYouPage,
});

const routeTree = rootRoute.addChildren([indexRoute, thankYouRoute]);

const router = createRouter({
  routeTree,
});

export default function App() {
  return <RouterProvider router={router} />;
}
