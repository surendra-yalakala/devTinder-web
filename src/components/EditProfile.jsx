import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );

      //   dispatch(addUser(res.data));
      //   return navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-start gap-10 my-10 flex-wrap">
      <div className="flex justify-center my-10">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div>
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
              <fieldset className="fieldset py-2">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset py-2">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset py-2">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset py-2">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{errorMsg}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={() => saveProfile()}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard data={user} />
    </div>
  );
};

export default EditProfile;
