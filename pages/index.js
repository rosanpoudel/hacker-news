import { Container, Grid, Pagination, TextField } from "@mui/material";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import NewsCard from "../components/newsCard";
import NewsSkeleton from "../components/skeleton";
import { debounce } from "lodash";

export default function Home() {
  const [newsList, setNewsList] = useState(null);
  const [activePage, setActivePage] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("front_page");
  const [fetchingNews, setFetchingNews] = useState(false);

  // fetch news from api
  const fetchNewsLists = async (page, query, tags) => {
    setFetchingNews(true);
    try {
      const url = `https://hn.algolia.com/api/v1/search?tags=${tags}&query=${query}&page=${page}`;
      const response = await fetch(url);
      const news = await response.json();
      setFetchingNews(false);

      if (news) {
        setNewsList(news);
      }
    } catch (err) {
      setNewsList({ hits: [] });
    }
  };

  // handle pagination
  const handlePageChange = (event, value) => {
    setActivePage(value);
    fetchNewsLists(value, searchQuery, filterCategory);
    window.scrollTo(0, 0);
  };

  // handle search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    handleSearchDebounce(value);
    setSearchQuery(value);
    setFilterCategory("story");
    if (value?.length > 0) {
      setActivePage("0");
    } else {
      setActivePage("1");
    }
  };

  const handleSearchDebounce = useCallback(
    debounce(async (value) => {
      fetchNewsLists(0, value, "story");
    }, 700),
    []
  );

  const handleCategoryFilter = (value) => {
    setFilterCategory(value);
    fetchNewsLists(0, "", value);
  };

  useEffect(() => {
    fetchNewsLists(activePage, searchQuery, filterCategory);
  }, []);

  return (
    <div>
      <Head>
        <title>Hackers news</title>
        <meta name="description" content="Home page" />
      </Head>
      <>
        <Container maxWidth="xl">
          {/* filters */}
          <div className="filter-bar">
            <div className="filter-btns">
              <div
                className={`filter-btn ${
                  filterCategory == "front_page" && "active"
                }`}
                onClick={() => handleCategoryFilter("front_page")}
              >
                Popular
              </div>
              <div
                className={`filter-btn ${
                  filterCategory == "story" && "active"
                }`}
                onClick={() => handleCategoryFilter("story")}
              >
                Latest
              </div>
            </div>
            <div className="search-bar">
              <TextField
                value={searchQuery}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {/* cards */}
          <div className="cards-wrapper">
            {fetchingNews ? (
              <NewsSkeleton />
            ) : (
              <Grid container spacing={4}>
                <>
                  {searchQuery?.length > 0 && newsList?.hits?.length == 0 ? (
                    <h2 className="no-data">
                      No data found for: <strong>{searchQuery}</strong>
                    </h2>
                  ) : (
                    <>
                      {newsList?.hits?.map((news) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={3}
                          style={{ marginBottom: "40px" }}
                          key={news?.objectID}
                        >
                          <NewsCard news={news} />
                        </Grid>
                      ))}
                    </>
                  )}
                </>
              </Grid>
            )}
          </div>
          {/* pagination */}
          {!searchQuery?.length > 0 &&
            !fetchingNews &&
            newsList?.hits?.length > 0 && (
              <div className="pagination flex-all-center">
                <Pagination
                  count={2}
                  color="secondary"
                  onChange={handlePageChange}
                  page={Number(activePage)}
                />
              </div>
            )}
        </Container>
      </>
    </div>
  );
}
