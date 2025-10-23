import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Container from "../container/Container";
import Logo from '../Logo'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
  { name: "Login", slug: "/login", active: !authStatus },
  { name: "Signup", slug: "/signup", active: !authStatus },
  { name: "All Posts", slug: "/all-posts", active: authStatus },
  { name: "Add Post", slug: "/add-post", active: authStatus },
  ];
  return (
   <>

   <div>
    <Container>

      <div>
        <Link to={'/'}>
        <Logo width="100px"/>
        </Link>
      </div>

      <div>

        <ul>
          {navItems.map((item)=>(
            item.active ? (
              <li key = {item.name}>

                <button onClick={()=>navigate(item.slug)}>
                  {item.name}
                </button>

              </li>
            ) : null
          ))}
        </ul>
      </div>
    </Container>
   </div>
   
   
   </>
  );
};

export default Header;
