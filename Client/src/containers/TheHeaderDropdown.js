import React from 'react';
import {
  CDropdown,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import SignInOut from './logInOut';

const TheHeaderDropdown = () => {
   
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/avatar.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
        <SignInOut />
    </CDropdown>
  )
};

export default TheHeaderDropdown;
