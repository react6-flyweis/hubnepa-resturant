import logo from "@/assets/logo-food-mart.svg"
import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between bg-[#020618CC] px-6 py-8 text-white">
      {/* left side logo and title */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Hubnepa logo" className="h-10 w-auto" />
        {/* <span className="text-lg font-semibold">HUBNEPA</span>
          <span className="text-xs tracking-widest">FOOD & MART</span> */}
      </div>

      {/* right side links */}
      <nav className="flex items-center space-x-6 text-gray-300">
        <Link to="/privacy" className="text-sm hover:underline">
          Privacy
        </Link>
        <Link to="/terms" className="text-sm hover:underline">
          Terms
        </Link>
        <Link to="/contact" className="text-sm hover:underline">
          Contact
        </Link>
      </nav>

      {/* copyright line */}
      <div className="mt-4 text-xs text-gray-300">© 2026 HUBNEPA.</div>
    </footer>
  )
}
