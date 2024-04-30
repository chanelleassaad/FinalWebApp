import moment from "moment";
import { IResult } from "../../data/RootInterface";
import "./NewsPost.css";

function NewsPost({ post }: { post: IResult }) {
  return (
    <div key={post._id} className="post-container bg-white">
      <div className="flex items-center">
        {post.image_url ? (
          <img src={post.image_url} alt={""} className="post-image" />
        ) : (
          <img src={post.source_icon} alt={""} className="post-image" />
        )}
        <div className="flex flex-col" style={{ width: "93%" }}>
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
  );
}

export default NewsPost;
