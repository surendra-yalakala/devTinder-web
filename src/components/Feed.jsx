import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed?.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed?.length > 0 && (
      <div>
        <UserCard user={feed[0]} isFromFeed={true} />
      </div>
    )
  );
};

export default Feed;
