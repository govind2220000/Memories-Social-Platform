import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/api/index.js";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPage } = useSelector((state) => state?.app?.posts);
  //console.log(numberOfPage);
  useEffect(() => {
    console.log(page);
    if (page) {
      dispatch(fetchPosts({ page }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, dispatch]);
  return (
    <Pagination
      sx={{
        borderRadius: 4,
        marginTop: {
          md: "0.2rem",
          lg: "1rem",
        },
        padding: {
          xs: "2px",
          md: "2px",
          lg: "10px",
        },
      }}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        ></PaginationItem>
      )}
    ></Pagination>
  );
};

export default Paginate;
