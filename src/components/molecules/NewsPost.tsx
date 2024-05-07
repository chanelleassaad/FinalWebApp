import { useState } from "react";
import moment from "moment";
import { IResult } from "../../data/RootInterface";
import "./NewsPost.css";
import NewsPopup from "./NewsPopup";

interface Props {
  post: IResult;
}

const NewsPost: React.FC<Props> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IResult | null>(null);

  const handleOpen = (post: IResult) => {
    setSelectedPost(post);
  };
  const handleClose = () => {
    setSelectedPost(null);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <div
        className={`post-container bg-white ${isHovered ? "enlarged" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleOpen(post)}
      >
        <div className="flex items-center">
          {post.image_url && (
            <img src={post.image_url} alt="" className="post-image" />
          )}
          {!post.image_url && post.source_icon && (
            <img src={post.source_icon} alt="" className="post-image" />
          )}
          <div
            className="flex flex-col"
            style={{ width: "93%", flex: "auto", justifyContent: "flex-end" }}
          >
            <div className="flex justify-between">
              <div className="post-title">{post.title}</div>
              <div className="post-date">
                {moment(post.pubDate).format("HH:MM MMM DD, YY")}
              </div>
            </div>
            <div className="post-description">{post.description}</div>
          </div>
        </div>
      </div>
      {selectedPost && (
        <NewsPopup post={selectedPost} handleClose={handleClose} />
      )}
    </>
  );
};

export default NewsPost;
