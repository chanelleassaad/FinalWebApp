import { ThunkDispatch } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../config/PostsApi";
import { IResult } from "../data/RootInterface";
import { useAuth } from "../store/authentication/AuthContext";
import { Pagination } from "@mui/material";
import "./NewsPage.style.css";
import NewsPost from "../components/molecules/NewsPost";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: any) => state.posts);
  const { userToken, updateAccessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<IResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNews = async () => {
    try {
      if (userToken) {
        await (dispatch as ThunkDispatch<any, any, any>)(
          getPosts(userToken, page, updateAccessToken)
        );
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [userToken, page]);

  useEffect(() => {
    if (posts && posts.results) {
      setAllPosts((prev) => {
        return [...posts.results];
      });
      setTotalPages(posts.pagination.totalPages);
    }
  }, [posts]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="container mx-auto flex flex-col height1">
      <div className="w-full ring-2 ring-blue-700 height2 ">
        <div className="p-2 bg-blue-600 height3 relative py-5 ">
          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          {error && <div className="error-message">Error: {error}</div>}
          {allPosts.map((post, index) => (
            <NewsPost post={post} key={index} />
          ))}
        </div>

        <div className="flex justify-center p-3">
          <Pagination
            color="primary"
            page={page}
            count={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
