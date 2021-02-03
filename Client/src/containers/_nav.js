import React from "react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faDesktop,
  faHeart,
  faQuestion,
  faQuestionCircle,
  faUserCog,
  faUsers,
  faVial,
} from "@fortawesome/free-solid-svg-icons";

const _adminNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "PLH-2.0",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["User"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Application Management",
    // to: '/theme/colors',
    to: "/app-management",
    icon: (
      <FontAwesomeIcon
        icon={faDesktop}
        size="2x"
        style={{ paddingRight: "6" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Test Cases Management",
    to: "/theme/typography",
    icon: (
      <FontAwesomeIcon icon={faVial} size="2x" style={{ paddingRight: "6" }} />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "App Relation Management",
    to: "/app-relation",
    icon: (
      <FontAwesomeIcon icon={faHeart} size="2x" style={{ paddingRight: "5" }} />
    ),
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "User Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon icon={faUsers} size="2x" style={{ paddingRight: "5" }} />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Application Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faDesktop}
        size="2x"
        style={{ paddingRight: "6" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Request Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faQuestionCircle}
        size="2x"
        style={{ paddingRight: "5" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "User-App Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faUserCog}
        size="2x"
        style={{ paddingRight: "10" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Page Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon icon={faAt} size="2x" style={{ paddingRight: "6" }} />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Test Cases Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon icon={faVial} size="2x" style={{ paddingRight: "6" }} />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Security Question Management",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faQuestionCircle}
        size="2x"
        style={{ paddingRight: "6" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["HELP"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "FAQ",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faQuestion}
        size="2x"
        style={{ paddingRight: "5" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

const _userNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "PLH-2.0",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["User"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Application Management",
    to: "/theme/colors",
    icon: (
      <FontAwesomeIcon
        icon={faDesktop}
        size="2x"
        style={{ paddingRight: "6" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Test Cases Management",
    to: "/theme/typography",
    icon: (
      <FontAwesomeIcon icon={faVial} size="2x" style={{ paddingRight: "6" }} />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "App Relation Management",
    to: "/theme/typography",
    icon: (
      <FontAwesomeIcon icon={faHeart} size="2x" style={{ paddingRight: "5" }} />
    ),
  },
  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["HELP"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "FAQ",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faQuestion}
        size="2x"
        style={{ paddingRight: "5" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

const _noRoleNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "PLH-2.0",
    },
  },
  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["HELP"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "FAQ",
    to: "/charts",
    icon: (
      <FontAwesomeIcon
        icon={faQuestion}
        size="2x"
        style={{ paddingRight: "5" }}
      />
    ),
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export { _adminNav, _userNav, _noRoleNav };
