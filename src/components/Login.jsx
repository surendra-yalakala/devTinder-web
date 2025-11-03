import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rsharma@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm c">
        <div className="card-body">
          <h2 className="card-title justify-center">Login!</h2>
          <div>
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
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => doLogin()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
