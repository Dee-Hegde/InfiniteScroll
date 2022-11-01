import axios from "axios";
import { Button, Row, Spin } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const { isAuth } = React.useContext(AuthContext);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const handleFetch = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`https://randomuser.me/api/?results=10`);
      await setList((prev) => [...prev, ...res.data.results]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      if (list.length < 500) {
        handleFetch();
      }
    }
  }, [page, isAuth]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  
  const handleScroll = () => {
    window.scrollTo(-0, -10);
  };

  return (
    <div className="App">
      <div className="home-container">
        {list &&
          list.map((item, i) => (
            <Row key={i} className="mt10 user-card">
              <img
                className="m10 user-img"
                src={item?.picture?.thumbnail}
                alt=""
              />
              <h3 className="m10">{`${item?.name?.title}. ${item?.name?.first}${item?.name?.last}`}</h3>
            </Row>
          ))}
      </div>
      {loading && <Spin className="mt10" tip="Loading..." size="large" />}
      {error && <p>Error!</p>}
      <div ref={loader} />
      {list.length >= 500 && (
        <Button
          onClick={handleScroll}
          className="mt20 nav-button"
          type="primary"
        >
          Scroll to top
        </Button>
      )}
    </div>
  );
}

export default Home;
