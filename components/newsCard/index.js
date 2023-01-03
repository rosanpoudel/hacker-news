import * as React from "react";

import moment from "moment";
import { truncate } from "../../helpers/textTruncate";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import CommentIcon from "@mui/icons-material/Comment";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import BallotIcon from "@mui/icons-material/Ballot";
import { Tooltip } from "@mui/material";
import Link from "next/link";

const NewsCard = ({ news }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="news image"
        height="210"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0FUVsKTZpxNUQf76k5zha9ilTAwXF9R3DFhSn-Rs&s"
      />
      <CardContent>
        <div className="created-details">
          By <p className="author">{news?.author}</p>{" "}
          <p className="separator">|</p>
          <p className="date">{moment(news?.created_at).format("LL")}</p>
        </div>
        <Typography gutterBottom variant="h6" height={110} component="div">
          {truncate(news?.title, 80)}
        </Typography>

        <Link href={news?.url || ""} passHref>
          <a className="url" target="_blank">
            <Typography variant="body2" height={20}>
              {truncate(news?.url, 45)}
            </Typography>
          </a>
        </Link>
      </CardContent>
      <CardActions>
        {news?.points > 0 && (
          <Button>
            <Tooltip
              placement="top"
              arrow
              title={`Total points: ${news?.points}`}
            >
              <Badge
                color="secondary"
                badgeContent={news?.points}
                max="9999999999999"
              >
                <BallotIcon color="action" />
              </Badge>
            </Tooltip>
          </Button>
        )}

        {news?.num_comments > 0 && (
          <Button>
            <Tooltip
              placement="top"
              arrow
              title={`Total comments: ${news?.num_comments}`}
            >
              <Badge
                color="secondary"
                badgeContent={news?.num_comments}
                max="9999999999999"
              >
                <CommentIcon color="action" />
              </Badge>
            </Tooltip>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default NewsCard;
