import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, LucideShoppingCart, ShoppingCart } from "lucide-react"
import ShoppingCartIcon from "./ShoppingCartIcon"


const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
        {/* LEFT */}
        <Link href='' className="flex items-center">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`} alt="Tren" width={36} height={36} className="w-6 h-6 md:w-9 md:h-9" />
            <p className="text-md font-medium tracking-wider">TRENDLAMA.</p>
        </Link>
        

        
        {/* RIGHT */}
        <div className="flex gap-5 items-center ">
            <SearchBar/>
            <Link href="/" className="flex">
            {/*  its not a components, its a icon like a component */}
            <Home className="w-4 h-4 text-gray-200"/>
         </Link>
          <Bell className="w-4 h-4 text-gray-200"/>
          <ShoppingCartIcon/>
          <Link href="/login">Sign in</Link>
        </div>

    </nav>
  )
}

export default Navbar