import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections?.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return <h1 className="flex justify-center my-10">No connections found!</h1>;
  }

  return (
    <div>
      <h1 className=" my-10 text-3xl font-sans text-center">My Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, about, age, gender } = connection;
        return (
          <div
            key={connection._id}
            className="card m-5 p-5 shadow-md bg-base-300 flex items-center flex-row max-w-1/2 m-auto"
          >
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  alt="Connection Avatar"
                  src={
                    connection.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <div className="ml-5">
              <p className="font-bold text-xl font-sans">
                {firstName + " " + lastName}
              </p>
              {age && gender && (
                <p className="font-sans text-sm">{age + ", " + gender}</p>
              )}
              <p className="font-sans text-sm mt-2">{about}</p>
            </div>
            <div>
              <Link to={`/chat/${connection._id}`}>
                <button className="btn btn-secondary ml-10">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
