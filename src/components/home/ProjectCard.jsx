import React, { useState, useEffect, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const ProjectCard = ({ value }) => {
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    languages_url,
    languages,
    // pushed_at,
    extra,
  } = value;

  return (
    <Col md={6}>
      <Card className="card shadow-lg p-1 mb-5 bg-white rounded">
        <Card.Body>
          {svn_url ? <CardButtons svn_url={svn_url} name={name} /> : <Skeleton count={2} />}
          {/*<Card.Title as="h5">{name || <Skeleton />} </Card.Title>*/}
          <br/><br/>
          <Card.Text dangerouslySetInnerHTML={{__html:description}}></Card.Text>
          <hr />
          {value ? (
            <CardFooter
              // star_count={stargazers_count}
              repo_url={svn_url}
              // pushed_at={pushed_at}
              extra={extra}
            />
          ) : (
            <Skeleton />
          )}
          {languages && (
            <Language
              languages={languages} languages_url={languages_url}
              repo_url={svn_url} />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const CardButtons = ({ svn_url, name }) => {
  return (
    <>
{/*      <a
        href={`${svn_url}/archive/master.zip`}
        className="btn btn-outline-secondary mr-3"
      >
        <i className="fab fa-github" /> Clone Project
      </a>*/}
      <a href={svn_url} target=" _blank" className="btn btn-outline-info">
        <i className="fab fa-github" /> {name}
      </a>
    </>
  );
};

const Language = ({ languages, languages_url, repo_url }) => {
  const [data, setData] = useState([]);

  const handleRequest = useCallback(async () => {
    /*
    try {
      const response = await axios.get(languages_url);
      console.log(response.data);
      return setData(response.data);
    } catch (error) {
      console.error(error.message);
    }*/

    return setData(languages);
  }, [languages_url]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  // const array = data;
  // let total_count = 0;
  // for (let index in data) {
  //   array.push(index);
  //   total_count += data[index];
  // }

  return (
    <div>
      {/*Languages:{" "}*/}
      {data.length
        ? data.map((language) => (
            <a
              key={language} 
              className="badge badge-light card-link"
              // href={repo_url + `/search?l=${language}`}
              // target=" _blank"
            >
              {language}
              {/*{Math.trunc((data[language] / total_count) * 1000) / 10} %*/}
            </a>
          ))
        : "code yet to be deployed."}
    </div>
  );
};

const CardFooter = ({ star_count, repo_url, pushed_at, extra }) => {
  const [updated_at, setUpdated_at] = useState("0 mints");

  /*
  const handleUpdatetime = useCallback(() => {
    const date = new Date(pushed_at);
    const nowdate = new Date();
    const diff = nowdate.getTime() - date.getTime();
    const hours = Math.trunc(diff / 1000 / 60 / 60);

    if (hours < 24) {
      if (hours < 1) return setUpdated_at("just now");
      let measurement = hours === 1 ? "hour" : "hours";
      return setUpdated_at(`${hours.toString()} ${measurement} ago`);
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const time = new Intl.DateTimeFormat("en-US", options).format(date);
      return setUpdated_at(`on ${time}`);
    }
  }, [pushed_at]);

  useEffect(() => {
    handleUpdatetime();
  }, [handleUpdatetime]);
  */

  return (
    <p className="card-text">
    {/*
      <a
        href={repo_url + "/stargazers"}
        target=" _blank"
        className="text-dark text-decoration-none"
      >
        <span className="text-dark card-link mr-4">
          <i className="fab fa-github" /> Stars{" "}
          <span className="badge badge-dark">{star_count}</span>
        </span>
      </a>
    */}
    {extra &&
      (<p className="text-dark card-link"
        dangerouslySetInnerHTML={{__html:extra}}/>)
    }
    </p>
  );
};

export default ProjectCard;
