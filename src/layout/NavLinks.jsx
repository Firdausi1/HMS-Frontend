import { AiOutlineDashboard, AiOutlineUserAdd } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { FaUserFriends, FaClipboardList, FaBed } from "react-icons/fa";

export const adminDashboardLinks = [
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard className="mr-3 text-lg" />,
    link: "/admin",
  },
  {
    name: "Employees",
    icon: <FaUserFriends className="mr-3 text-lg" />,
    link: "/admin/employee",
  },
  {
    name: "Departments",
    icon: <FaClipboardList className="mr-3 text-lg" />,
    link: "/admin/department",
  },
  {
    name: "Patients",
    icon: <FaUserFriends className="mr-3 text-lg" />,
    link: "/admin/patients",
  },
  {
    name: "Bed Allotment",
    icon: <FaBed className="mr-3 text-lg" />,
    link: "/admin/allotment",
  },
  {
    name: "Medications",
    icon: <GiMedicines className="mr-3 text-lg" />,
    link: "/admin/medication",
  },
  {
    name: "Profile",
    icon: <AiOutlineUserAdd className="mr-3 text-lg" />,
    link: "/admin/profile",
  },
];
