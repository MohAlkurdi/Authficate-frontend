import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api";
export const Layout = () => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState({
    name: "",
    isAuthenticated: false,
  });

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");

      if (token) {
        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.user;

        // Update the user state with the fetched data
        setUser({
          name: userData.name,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking if a token is present in local storage)
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (token) {
      // Fetch user data from your API using the token
      // Replace this with your actual API call
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
    navigate(0);
  };
  return (
    <>
      <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h1 className="text-xl">Authficate</h1>
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
                {user.isAuthenticated ? (
                  <>
                    <li className="text-gray-700">
                      <p> Username: {user.name} </p>
                    </li>
                    <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
                    <li className="text-gray-700 hover:text-indigo-600">
                      <Link to="/search" className="block">
                        Search for a certificate
                      </Link>
                    </li>
                    <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
                    <li className="text-gray-700 hover:text-indigo-600">
                      <Link to="/dashboard" className="block">
                        Request all user certificates
                      </Link>
                    </li>
                    <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
                    <li className="text-gray-700 hover:text-indigo-600">
                      <Link to="/dashboard" className="block">
                        Dashboard
                      </Link>
                    </li>
                    <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
                    <li className="text-gray-700 hover:text-red-600">
                      <button onClick={handleLogout} className="block">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="block py-3 px-4 font-medium text-center text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 active:shadow-none rounded-lg shadow md:inline"
                      >
                        Register
                      </Link>
                    </li>
                    <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
                    <li className="text-gray-700 hover:text-indigo-600">
                      <Link to="/dashboard" className="block">
                        Request all user certificates
                      </Link>
                    </li>
                    <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
                    <li className="text-gray-700 hover:text-indigo-600">
                      <Link to="/search" className="block">
                        Search for a certificate
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8"> */}
      <Outlet />
      {/* </div> */}
      <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="mt-10 py-10 border-t flex items-center justify-between sm:flex">
            <p>© 2023 Authficate</p>
            <ul className="flex items-center justify-between gap-4 pt-6 sm:text-sm sm:mt-0">
              <li className="text-gray-800 hover:text-gray-500 duration-150">
                <Link
                  to="https://github.com/MohAlkurdi/Authficate-frontend"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="w-12 h-10"
                    viewBox="0 0 256 256"
                  >
                    <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
