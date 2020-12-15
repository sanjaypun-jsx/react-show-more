import { Button, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./landing.css";

const Landing = () => {
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(6);

  const fetchImages = async () => {
    const { data } = await Axios.get("https://picsum.photos/v2/list");
    setResult(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = result.slice(indexOfFirstImage, indexOfLastImage);

  const handleClick = () => {
    setImagesPerPage((imagesPerPage) => imagesPerPage + 6);
  };
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {currentImages.map((item, i) => {
        return (
          <Grid item key={i}>
            <img
              src={item.download_url}
              alt={item.author}
              style={{
                margin: "5px 5px",
                height: item.height / 20,
                maxWidth: "100%"
              }}
            />
          </Grid>
        );
      })}
      <Button
        onClick={handleClick}
        variant="outlined"
        color="primary"
        disableElevation
      >
        Next Page
      </Button>
    </Grid>
  );
};
export default Landing;
