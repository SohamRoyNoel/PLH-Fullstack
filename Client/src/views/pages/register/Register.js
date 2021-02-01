import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import swal from 'sweetalert';
import Login_Mutation from '../../../graphql/login.graphql';
import SecurityQuestions from './SecurityQuestionsDD';

const Register = () => {
  const history = useHistory();
  const [loginMutation] = useMutation(Login_Mutation);
  const goToLogin = () => {
    history.push('/login');
  }
  const goToDashboard = () => {
    history.push('/dashboard');
  }
  return (

    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={values => {
                    const errors = {};
                    // Validate Email
                    if (!values.email) {
                      errors.email = 'Email is Required';
                      return errors;
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                      return errors;
                    }

                    // Validate Password
                    if (!values.password) {
                      errors.password = 'Password is Required';
                      return errors;
                    }                     
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    let x = loginMutation({ variables: { login: values.email, password: values.password } }).catch((e) => {
                      console.log(e);
                    });
                    
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(x);
                      }, 300);
                    }).then((e) => {
                      // console.log(e.data.findLoggedInUser.accessToken);
                      localStorage.setItem("_jid", e.data.findLoggedInUser.accessToken);
                      history.push('/dashboard');
                    }).catch(() => {
                      swal("Error Login", "Try Again", "error").then(() => {
                        window.location.reload();
                      });
                    })

                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="email"
                          autoComplete="username" 
                        />
                      </CInputGroup> 
                      {errors.email && touched.email && errors.email}

                      <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="email"
                          autoComplete="username" 
                        />
                      </CInputGroup> 
                      {errors.email && touched.email && errors.email}


                      <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="email"
                          autoComplete="username" 
                        />
                      </CInputGroup> 
                      {errors.email && touched.email && errors.email}

                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="password"
                        />
                      </CInputGroup>                   
                      {errors.password && touched.password && errors.password}

                      <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                        <SecurityQuestions />
                      </CInputGroup> 
                      {errors.email && touched.email && errors.email}

                      <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="email"
                          autoComplete="username" 
                        />
                      </CInputGroup> 
                      {errors.email && touched.email && errors.email}
                      <br />
                      <CButton
                    type="submit"
                    disabled={isSubmitting}
                   color="success" block>Create Account</CButton>
                    </form>
                  )}
                </Formik>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton onClick={goToDashboard} className="btn-facebook mb-1" block><span>Dashboard</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton onClick={goToLogin} className="btn-twitter mb-1" block><span>Login</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
