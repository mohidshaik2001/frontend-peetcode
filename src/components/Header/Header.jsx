import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, PopoverMenu } from "../index.js";
import { Link } from "react-router-dom";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    // {
    //   name: "Problems",
    //   slug: "/problems",
    //   active: authStatus,
    // },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex items-center">
            {navItems.map((item) =>
              item.active ? (
                <li className="mr-4" key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 bg-amber-300 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            <PopoverMenu />
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
