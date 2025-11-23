import React from 'react'
import Container from '../container/Container'
import Logo from '../Logo'
import { logout } from '../../store/authSlice'
import LogoutBtn from './LogoutBtn'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
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
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className="py-5 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 ">
  <Container>
    <nav className="flex items-center">
      
      {/* Logo */}
      <div className="mr-6 flex items-center">
        <Link to="/">
          <Logo width="90px" />
        </Link>
      </div>

      {/* Nav Items */}
      <ul className="flex items-center ml-auto gap-3">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md"
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}

        {/* Logout Button */}
        {authStatus && (
          <li className="ml-3">
            <LogoutBtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>

  )
}

export default Header