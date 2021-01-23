import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import Login_Mutation from '../../../graphql/login.graphql';

const Login = () => {
  const [loginMutation] = useMutation(Login_Mutation);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
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
                  onSubmit={(values, { }) => {
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
                      <br />
                      <button 
                      type="submit"
                      className="btn btn-outline-warning"
                      disabled={isSubmitting}>
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
