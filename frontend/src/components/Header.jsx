import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <>
      <header className="py-2.5 bg-[#fcf2e8]">
        <div className="container">
          <div className="header_wrapper flex justify-between items-center gap-10">
            <div className="logo_wrapper">
              <div className="logo">
                <Link to="/" className="flex items-center gap-2">
                  <img className="max-w-32 w-full" src="/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="navigation_wrapper">
              <nav>
                <ul className="flex items-center gap-5">
                  <li>
                    <Link to="/">Offers</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/">How it works</Link>
                  </li>
                  <li>
                    <Link to="/">Help</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="login_wrapper flex items-center gap-5">
              <div className="login_btn flex items-center gap-2">
                <User />
                <span>User</span>
              </div>
              <div className="cart_btn">
                <ShoppingCart />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
