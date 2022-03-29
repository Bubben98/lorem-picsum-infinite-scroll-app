import { useEffect, useState } from "react";
import "./App.css";

const Img = props => {
  return (
    <div className="imgDiv">
      <img src={props.img.download_url} />
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState(1);
  const [img, setImg] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
  }, []);
  useEffect(() => {
    fetchData();
  }, [page]);

  const infiniteScroll = () => {
    const scrollPosition = Math.round(
      window.innerHeight + document.documentElement.scrollTop
    );
    const pageBottom = document.documentElement.offsetHeight;
    if (scrollPosition === pageBottom) {
      setPage(page => page + 1);
    }
  };
  const fetchData = () => {
    let imgUrl = "https://picsum.photos/v2/list?page=" + page + "&limit=10";

    fetch(imgUrl)
      .then(res => res.json())
      .then(data => {
        setImg([...img, ...data]);
      });
  };

  return (
    <div>
      {img.map((imgdata, idx) => (
        <Img key={idx} img={imgdata} />
      ))}
    </div>
  );
};

export default App;
