import {
  Building,
  Component,
  ComponentIcon,
  Cpu,
  Home,
  icons,
  Microchip,
  User,
} from "lucide-react";
import { Resources } from "../utils/rbac/resources";

export const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    resource: Resources.DASHBOARD,
    icon: Home,
  },
  {
    label: "Users",
    path: "/dashboard/users",
    resource: Resources.USERS,
    icon: User,
  },
  {
    label: "Port Types",
    path: "/dashboard/port-types",
    resource: Resources.PORT_TYPES,
    icon: Cpu,
  },
  {
    label: "Device Models",
    path: "/dashboard/device-models",
    resource: Resources.DEVICE_MODELS,
    icon: ComponentIcon,
  },
  {
    label: "Organizations",
    path: "/dashboard/organizations",
    resource: Resources.ORGANIZATIONS,
    icon: Building,
  },
  {
    label: "Devices",
    path: "/dashboard/devices",
    resource: Resources.DEVICES,
    icon: Microchip,
  },
];
