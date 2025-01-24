import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineSchedule,
} from "react-icons/ai";
import { FaUserFriends, FaClipboardList } from "react-icons/fa";

export const adminDashboardLinks = [
  // {
  //   name: "Dashboard",
  //   icon: <AiOutlineDashboard className="mr-3 text-lg" />,
  //   link: "/admin",
  // },
  {
    name: "Employees",
    icon: <FaUserFriends className="mr-3 text-lg" />,
    link: "/admin/employee",
  },
  {
    name: "Departments",
    icon:  <FaClipboardList className="mr-3 text-lg" />,
    link: "/admin/department",
  },
  {
    name: "Profile",
    icon: <AiOutlineUserAdd className="mr-3 text-lg" />,
    link: "/admin/profile"
  }
];
