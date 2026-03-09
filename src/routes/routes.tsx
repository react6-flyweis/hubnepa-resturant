import { lazy } from "react"
import type { RouteObject } from "react-router"

const HomePage = lazy(() => import("@/pages/HomePage"))
import { NotFound } from "@/pages/NotFoundPage"

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  // global 404 (optional)
  { path: "*", element: <NotFound /> },
]
