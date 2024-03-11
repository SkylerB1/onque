import { Link } from "react-router-dom";

const Footer = () => {
  return (

    <footer className="bg-white mt-auto rounded-lg shadow dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a to="https://onque.com/" className="hover:underline">OnQue™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/terms" className="mr-4 hover:underline md:mr-6 ">Terms & Condition</Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
          </li>
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6">Licensing</Link>
          </li>
          <li>
            <Link to="#" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>

  );
};

export default Footer;
