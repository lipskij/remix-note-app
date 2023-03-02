import { NavLink } from "@remix-run/react";

const MainNavigation: React.FC = () => {
  return (
    <nav
      id='main-navigation'
      className='flex flex-row justify-center bg-blue-500 p-5'
    >
      <ul className='flex text-slate-50 w-1/2 justify-evenly text-2xl'>
        <li className='hover:text-orange-200'>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li className='hover:text-orange-200'>
          <NavLink to='/notes'>My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
