import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavDivider
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import { _adminNav as a_navigation, _userNav as u_navigation, _noRoleNav as nr_navigation } from './_nav';
import { decodeJWt } from 'src/utils/HelperUtils';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.sidebarShow);
  let isAuth = decodeJWt();
  /* 
   * Login with respect to user role;
   * decodeJWt helps to 
  */
  try {
    if(isAuth.userRole === 'Admin') {
      return showComponent(show, a_navigation, dispatch);
    } else if(isAuth.userRole === 'User'){
      return showComponent(show, u_navigation, dispatch);
    } else {
      return showComponent(show, nr_navigation, dispatch);
    }
  } catch (error) {
    return showComponent(show, nr_navigation, dispatch);
  }
};

function showComponent(show, navigation, dispatch){
  return (
  <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  );
}

export default React.memo(TheSidebar);
