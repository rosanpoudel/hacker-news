import { Grid, Skeleton } from "@mui/material";
import React from "react";

const NewsSkeleton = () => {
  return (
    <div className="skeleton">
      <Grid container spacing={4}>
        {[...Array(10)]?.map((data, index) => (
          <Grid item xs={3} style={{ marginBottom: "40px" }} key={index}>
            <Skeleton variant="rectangular" width="100%" height={180} />
            <br />
            <Skeleton height={30} width="60%" />
            <Skeleton height={30} width="90%" />
            <br />
            <Skeleton height={30} />
            <div
              className="flex-all-center"
              style={{ justifyContent: "flex-start" }}
            >
              <div style={{ marginRight: "10px" }}>
                <Skeleton height={40} width={40} />
              </div>
              <div>
                <Skeleton height={40} width={40} />
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsSkeleton;
