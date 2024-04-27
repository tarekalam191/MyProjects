import React, { useState,useEffect } from "react";

function UserDetails(props) {

  console.log(props);
  const [loggedIn, setLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: ""
  })  

  //-------- Check if user is already logged in -----------//
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUserData(JSON.parse(loggedInUser));
      console.log(loggedInUser)
    }
  }, []);

  const changeData = (e) => {
    console.log(e.target.value);
    if (e.target.name == "email") {
      setUserData({
        ...userData,
        email: e.target.value
      })
      setErrors({
        ...errors,
        emailError: e.target.value.length == 0 ? "This Field Is Required" : (e.target.value.length < 3 || !validateEmail(e.target.value)) ? "Please Insert a Valid Email" : ""

      })
    
    } else {
      setUserData({
        ...userData,
        password: e.target.value
      });
      setErrors({
        ...errors,
        passwordError: e.target.value.length == 0 ? "This Field Is Required" : e.target.value.length < 4 && "Please Insert a Valid password"
      })
    }
   
  };
    

 //------- Submit user data to localStorage and get it --------------//
  const submitData = (e) => {

    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      if (userData.email === parsedUserData.email && userData.password === parsedUserData.password) {
        //---------- Store logged-in user data-------------//
        localStorage.setItem("loggedInUser", JSON.stringify(userData)); 
        alert("Login Successful!");
      } else {
        setErrors({
          emailError: "Invalid Email or Password",
          passwordError: "Invalid Email or Password",
        });
      }
    } else {
      alert("User Not Registered!");
    }
  }

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ShowPassword = () => {
  const passwordField = document.getElementById("exampleInputPassword1");
  passwordField.type = passwordField.type == "password" ? "text" : "password";
}

//-------------- Function Return  ---------------------------//

  return (
    <>
      <div className="row">
        <div className="col-ms-6 gol-md-4 col-lg-12">
          <h1>LOGIN</h1>
          <form onSubmit={(e)=> submitData(e)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
               
              <input
                type="email"
                className={`form-control ${errors.emailError && "border-danger"}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={userData.email}
                onChange={(e) => changeData(e)}
              />
              <p className="text-danger">{errors.emailError}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"> 
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={userData.password}
                able={userData.password}
                onChange={(e) => changeData(e)}
                onClick={(e)=>ShowPassword(userData.password)}
              />
              <p className="text-danger">{errors.passwordError}</p>
            </div><br></br>
            <button disabled={errors.emailError || errors.passwordError} type="submit" className="btn btn-primary">
              Login
            </button>
             </form><br></br><br></br>
             {loggedIn && <p>You are logged in!</p>}
            <button onClick={ShowPassword} type="show" className="btn btn-primary ">
              Show Password
            </button>
        </div>
      </div>
    </>
  );
}
export default UserDetails;
