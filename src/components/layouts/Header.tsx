import logo from "@/assets/logo.svg"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-[#020618CC] px-6 py-4 text-white">
      {/* left side - logo and title */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Hubnepa logo" className="h-15 w-auto" />
      </div>

      {/* right side - navigation links */}
      <nav className="flex items-center space-x-6">
        <Link to="/partner-login" className="text-sm hover:underline">
          Partner Login
        </Link>
        <Link to="/find-food">
          <Button
            variant="outline"
            className="rounded-full border-primary bg-transparent text-primary"
          >
            Find Food
          </Button>
        </Link>
      </nav>
    </header>
  )
}
