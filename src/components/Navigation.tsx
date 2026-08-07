import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/HushwoodLogoMain.png"
                alt="Hushwood & Co"
                className="h-24 w-24 object-contain"
              />
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary leading-none">
                Hushwood <span className="text-accent">& Co</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-accent transition-smooth">Home</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-accent transition-smooth">
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border border-border shadow-elegant">
                <div className="py-2">
                  <div className="px-3 pb-2 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    Categories
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/catalog/all" className="w-full">All Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/catalog/stationery" className="w-full">Stationery & Design</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/catalog/gifts" className="w-full">Gift Hampers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/catalog/decoration" className="w-full">Venue Decoration</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/catalog/corporate" className="w-full">Corporate Solutions</Link>
                  </DropdownMenuItem>
                </div>
                <div className="border-t py-2">
                  <div className="px-3 pb-2 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    Popular Occasions
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/occasion/wedding" className="w-full">Wedding Celebrations</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/occasion/festivals" className="w-full">Festivals</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/occasion/corporate" className="w-full">Corporate Events</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/occasion/birthday" className="w-full">Birthday Parties</Link>
                  </DropdownMenuItem>
                </div>
                <div className="border-t py-2">
                  <div className="px-3 pb-2 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    Specialties
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/subcategory/wedding-stationery" className="w-full">Wedding Stationery</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subcategory/corporate-gifts" className="w-full">Corporate Gifts</Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/about" className="text-foreground hover:text-accent transition-smooth">About</Link>
            <Link to="/contact" className="text-foreground hover:text-accent transition-smooth">Contact</Link>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/wishlist')}
                className="relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/cart')}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-accent transition-smooth"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link to="/" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>Home</Link>
            <Link to="/catalog/all" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>All Products</Link>
            <Link to="/catalog/stationery" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>Stationery & Design</Link>
            <Link to="/catalog/gifts" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>Gift Hampers</Link>
            <Link to="/catalog/decoration" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>Venue Decoration</Link>
            <Link to="/catalog/corporate" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>Corporate Solutions</Link>
            <Link to="/about" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="block text-foreground hover:text-accent transition-smooth" onClick={toggleMenu}>Contact</Link>
            <Link to="/catalog/all">
              <Button variant="hero" size="sm" className="w-full shadow-gold">
                Browse Catalog
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};