import {
    CDropdownItem,
    CDropdownMenu
  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { decodeJWt } from '../utils/HelperUtils';
import { useHistory } from 'react-router-dom';

function SignInOut(){
    let isUsr = decodeJWt();
    const history = useHistory();
    /* 
     * Login Method
    */
    const redirectToSignIn = () => {
        history.push('/login');
    };
    /* 
     * LogOut Method
    */
    const redirectToSignOut = () => {
        localStorage.clear();
        window.location.reload();
        history.push('/dashboard');
    };
    if(isUsr === undefined) {
        return (
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                >
                    <strong>Role: ET User</strong>
                </CDropdownItem>
                <CDropdownItem onClick={redirectToSignIn}>
                    <CIcon  name="cil-comment-square" className="mfe-2" />
                    Sign In
                </CDropdownItem>
            </CDropdownMenu>
        )
    } else {
        return (
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                >
                    <strong>Account</strong>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-bell" className="mfe-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                >
                    <strong>Role: { isUsr.userRole }</strong>
                </CDropdownItem>
                <CDropdownItem onClick= { redirectToSignOut }>
                    <CIcon name="cil-comment-square" className="mfe-2" />
                    Sign Out
                </CDropdownItem>
            </CDropdownMenu>
        )
    }
};

export default SignInOut;

