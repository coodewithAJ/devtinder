import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../redux/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeedData = async () => {
    try {
      const feedData = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addfeed(feedData?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getFeedData();
  }, []);
  return (
    feed && (
      <div className="flex justify-center items-center my-3">
        {feed?.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
      </div>
    )
  );
};
export default Feed;
