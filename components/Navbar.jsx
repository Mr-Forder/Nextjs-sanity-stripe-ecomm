import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">LOGO</Link>
      </p>
      <button type="button" className="cart-icon">
        CART
        <span className="cart-item-qty">12</span>
      </button>
    </div>
  );
};

export default Navbar;
