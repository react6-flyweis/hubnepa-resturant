import { lazy } from "react"
import type { RouteObject } from "react-router"

const HomePage = lazy(() => import("@/pages/HomePage"))
const RestaurantsPage = lazy(() => import("@/pages/RestaurantsPage"))
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"))
const PartnerLoginPage = lazy(() => import("@/pages/PartnerLoginPage"))
const DashboardPage = lazy(() => import("@/pages/DashboardPage.tsx"))
const OrderManagementPage = lazy(() => import("@/pages/OrderManagementPage"))

import DashLayout from "@/components/layouts/DashLayout"
import { NotFound } from "@/pages/NotFoundPage"

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/restaurants",
    element: <RestaurantsPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/partner-login",
    element: <PartnerLoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashLayout />, // layout will render nested pages via <Outlet />
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "orders", element: <OrderManagementPage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
  // global 404 (optional)
  { path: "*", element: <NotFound /> },
]
