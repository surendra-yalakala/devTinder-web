import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const doSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setErrorMsg(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm c">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login!" : "Sign Up!"}
          </h2>
          <div>
            {isLogin ? null : (
              <>
                <fieldset className="fieldset py-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => (isLogin ? doLogin() : doSignUp())}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="text-center mt-4 cursor-pointer text-blue-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
