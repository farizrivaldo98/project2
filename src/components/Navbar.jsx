import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const navigation = [
  { name: "Maintenance", href: "#", current: false },
  { name: "Instrument", href: "#", current: false },
  { name: "Utility", href: "#", current: false },
  { name: "Production", href: "#", current: false },
  { name: "building", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const userGlobal = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user_token");
    navigate("/");
    navigate(0);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8x2 px-6 sm:px-8 lg:px-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div>
                <img
                  className="hidden h-12 w-auto lg:block flex-row"
                  src="https://kalbeconsumerhealth-web.s3.ap-southeast-1.amazonaws.com/assets/media/1636428076601-829757853-logo-putih.png"
                  alt="Your Company"
                />
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  {userGlobal.id ? (
                    <div className="flex space-x-5">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => {
                            navigate(`/${item.name}`);
                          }}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              {userGlobal.id ? (
                <>
                  <Menu>
                    <MenuButton className=" flex flex-2 items-end justify-end bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                      <img
                        className="inline-block h-6 w-6 mr-3 rounded-full ring-2 ring-red"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt=""
                      />
                      {userGlobal.name}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => navigate("/editprofile")}>
                        Edit Profile
                      </MenuItem>
                      <MenuItem onClick={() => logOut()}>LogOut</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <div></div>
              )}

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
