import React, { useEffect } from "react";
import { withFormik, Formik, Field } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { USER_SIGIN_SAGA } from "../../redux/constants/UserConstants";

function SignUp(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  function validateEmail(value) {
    let error;
    if (!/^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/i.test(value)) {
      error = "Email is invalid!";
    }
    return error;
  }
  return (
    <div className="col-6  text-center mb-5">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} style={{ width: "75%", margin: "auto" }}>
        <div className=" mt-3">
          <Field
            onChange={handleChange}
            type="email"
            className="inputForm"
            placeholder="email"
            name="email"
            validate={validateEmail}
          />
        </div>
        {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
        {touched.email ? <div>{errors.email}</div> : null}

        <div className=" mt-3">
          <input
            onChange={handleChange}
            type="passWord"
            name="passWord"
            className="inputForm"
            placeholder="passWord"
          />
        </div>
        {touched.passWord ? (
          <div className="text-danger">{errors.passWord}</div>
        ) : (
          ""
        )}

        <div className=" mt-3">
          <input
            onChange={handleChange}
            className="inputForm"
            type="phoneNumber"
            placeholder="phoneNumber"
            name="phoneNumber"
          />
        </div>
        {touched.phoneNumber ? (
          <div className="text-danger">{errors.phoneNumber}</div>
        ) : (
          ""
        )}

        <div className=" mt-3">
          <input
            onChange={handleChange}
            className="inputForm"
            type="name"
            placeholder="name"
            name="name"
          />
        </div>
        {touched.name ? <div className="text-danger">{errors.name}</div> : ""}

        <div className="mt-5">
          <button className="styleButton" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
const SignUpFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    phoneNumber: "",
    name: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    passWord: Yup.string()
      .required("Password is required!")
      .min(6, "Password must have min 6 characters")
      .max(32, "Password  have max 32 characters"),
    phoneNumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required("A phone number is required"),
    name: Yup.string()
      .max(50, "Must be 15 characters or less")
      .required("Required"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch({ type: USER_SIGIN_SAGA, userValues: values });
  },
  displayName: "SignUp",
})(SignUp);

export default connect()(SignUpFormik);
