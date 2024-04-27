import React, { useState } from "react";

function UserRegister() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    userNameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const changeRegisterData = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (e.target.name == "name") {
      setUserData({
        ...userData,
        name: e.target.value,
      });

      setErrors({
        ...errors,
        nameError:
          e.target.value.length == 0
            ? "This Field Is Required"
            : e.target.value.length < 3 && "Please Insert a Valid Name",
      });
    } else if (e.target.name == "email") {
      setUserData({
        ...userData,
        email: e.target.value,
      });
      setErrors({
        ...errors,
        emailError:
        e.target.value.length == 0
        ? "This Field Is Required"
        : !validateEmail(e.target.value)
        ? "Please Insert a Valid Email"
        : ""
      });
    } else if (e.target.name == "userName") {
      setUserData({
        ...userData,
        userName: e.target.value,
      });
      setErrors({
        ...errors,
        userNameError:
        e.target.value.length == 0
        ? "This Field Is Required"
        : e.target.value.includes(" ")
        ? "Username Should not contain spaces"
        : "",
      });
    } else if (e.target.name == "password") {
      setUserData({
        ...userData,
        password: e.target.value,
      });
      setErrors({
        ...errors,
        passwordError:
        e.target.value.length == 0
        ? "This Field Is Required"
        : e.target.value.length < 5
        ? "Password should be at least 5 characters long"
        : !/[a-z]/.test(e.target.value)
        ? "Password should contain at least one lowercase letter"
        : !/[A-Z]/.test(e.target.value)
        ? "Password should contain at least one uppercase letter"
        : !/\d/.test(e.target.value)
        ? "Password should contain at least one digit"
        : !/[@*%$#]/.test(e.target.value)
        ? "Password should contain at least one special character"
        : ""
      });
    } else {
      setUserData({
        ...userData,
        confirmPassword: e.target.value,
      });
      setErrors({
        ...errors,
        confirmPasswordError:
        e.target.value.length == 0
        ? "This Field Is Required"
        : e.target.value != userData.password
        ? "Confirm Password do not match Password"
        : "",
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 //-------------Submit Data And Stored It In Local Storage ------------//
  const submitData = (e) => {
    e.preventDefault();
  
    if (!Object.values(errors).some((error) => error)) {

      //------- Save user data to localStorage --------------//
      localStorage.setItem("userData", JSON.stringify(userData)); 
      alert("Registration Successful!");
      
      setUserData({
        name: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      alert("Please Fix The Errors before Submitting.");
    }
  };

  const ShowPassword = (e) => {
    console.log(`${userData.password}`);
  };

  //------------------Function Return -------------------//
  return (
    <>
      <div className="row">
        <div className="col-ms-6 gol-md-4 col-lg-12">
          <h1>REGISTER</h1>
          <form onSubmit={(e) => submitData(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                {" "}
                {/* Corrected htmlFor attribute */}
                Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.nameError && "border-danger"
                }`}
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) => changeRegisterData(e)}
              />
              <p className="text-danger">{errors.nameError}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                {" "}
                {/* Corrected htmlFor attribute */}
                Email
              </label>

              <input
                type="email"
                className={`form-control ${
                  errors.emailError && "border-danger"
                }`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={userData.email}
                onChange={(e) => changeRegisterData(e)}
              />
              <p className="text-danger">{errors.emailError}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                {" "}
                {/* Corrected htmlFor attribute */}
                User Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.userNameError && "border-danger"
                }`}
                id="userName"
                name="userName"
                value={userData.userName}
                onChange={(e) => changeRegisterData(e)}
              />
              <p className="text-danger">{errors.userNameError}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                {" "}
                {/* Corrected htmlFor attribute */}
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={userData.password}
                able={userData.password}
                onChange={(e) => changeRegisterData(e)}
                onClick={(e) => ShowPassword(userData.password)}
              />
              <p className="text-danger">{errors.passwordError}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                {" "}
                {/* Corrected htmlFor attribute */}
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={(e) => changeRegisterData(e)}
                onClick={(e) => ShowPassword(userData.confirmPassword)}
              />
              <p className="text-danger">{errors.confirmPasswordError}</p>
            </div>
            <br></br>

            <button
              disabled={
                errors.nameError ||
                errors.emailError ||
                errors.userNameError ||
                errors.passwordError ||
                errors.confirmPasswordError
              }
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>
          </form>
          <br></br>
          <button
            onClick={(e) => ShowPassword(e)}
            type="show"
            className="btn btn-primary"
          >
            Show Password
          </button>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
