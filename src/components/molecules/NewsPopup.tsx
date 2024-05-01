import { Box, Modal, Typography } from "@mui/material";
import { IResult } from "../../data/RootInterface";
import "./NewsPopup.css";

interface IProps {
  post: IResult;
  handleClose: () => void;
}

const NewsPopup = ({ post, handleClose }: IProps) => {
  const isArabic = post.language === "arabic";

  return (
    <Modal open={post !== null} onClose={handleClose}>
      <Box className="modal">
        <div className="header">
          {post.source_icon && (
            <img src={post.source_icon} className="icon" alt={post.source_id} />
          )}
          <p className="h1" dir={isArabic ? "rtl" : "ltr"}>
            {post.title}
          </p>
        </div>
        <div className="image-container">
          {post.image_url && !post.video_url && (
            <img src={post.image_url} className="image-display" alt="" />
          )}
          {post.video_url && (
            <video src={post.video_url} className="image-display" />
          )}
        </div>
        <div className="details">
          {post.creator && post.creator[0] !== "" && (
            <Typography className="creator">
              by {post.creator.join(", ")}
            </Typography>
          )}

          {post.pubDate && (
            <Typography className="creator">
              {new Date(post.pubDate).toLocaleDateString()}{" "}
            </Typography>
          )}
        </div>
        {post.description && (
          <Typography className="description" dir={isArabic ? "rtl" : "ltr"}>
            {post.description.replace(/nbsp;/g, "")}
          </Typography>
        )}
        <p className="more-details">
          More details on{" "}
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.link}
          </a>
        </p>
      </Box>
    </Modal>
  );
};

export default NewsPopup;
