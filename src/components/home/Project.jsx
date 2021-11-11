import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import axios from "axios";

const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: null,
  pushed_at: null,
};
const API = "https://api.github.com";
// const gitHubQuery = "/repos?sort=updated&direction=desc";
// const specficQuerry = "https://api.github.com/repos/hashirshoaeb/";

const Project = ({ heading, username, length, specfic }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;
  const dummyProjectsArr = new Array(length + specfic.length).fill(
    dummyProject
  );

  const [projectsArray, setProjectsArray] = useState([]);
  
  const fetchRepos = useCallback(async () => {
    
    let repoList = [
{
    name: "autochord",
    description: "Python library for Automatic Chord Recognition and Javascript app for Chord Visualization",
    svn_url: "https://github.com/cjbayron/autochord",
    extra: "&#127932 <b>ISMIR2021 Late-Breaking Demo</b> presentation: <a href=https://drive.google.com/file/d/1cTAEK-PwD3wI6YhdPsLpe3SYOCdYuLlg/view target='_blank'>[poster]</a>, <a href=https://archives.ismir.net/ismir2021/latebreaking/000008.pdf target='_blank'>[paper]</a>",
    languages: ["Jupyter Notebook", "Python", "TensorFlow", "JavaScript"]
},
{
    name: "audiate",
    description: "<i>Play-what-you-hear</i> ear training game using machine learning models in the browser. Powered by <i>TensorFlow.js</i>.",
    svn_url: "https://github.com/cjbayron/audiate",
    extra: "&#127942 <b>Winning entry</b> to <a href=https://aipilipinas.org/ target='_blank'><i>AIPilipinas'</i></a> (AI Philippines) <b>TensorFlow Project Showcase 2020-2021</b>",
    languages: ["JavaScript", "TensorFlow.js"]
},
{
    name: "c-rnn-gan.pytorch",
    description: "<i>Pytorch</i> implementation of C-RNN-GAN model for Symbolic Music Generation",
    svn_url: "https://github.com/cjbayron/c-rnn-gan.pytorch",
    extra: "&#11088 30+ Github stars",
    languages: ["Python", "PyTorch"]
},
{
    name: "TheSoundOfAIOSR/rg_speech_to_text",
    description: "STT module for Sound of AI's voice-controlled music generation research. Contributed in research and experimentation of STT models and integration of VAD module.",
    svn_url: "https://github.com/TheSoundOfAIOSR/rg_speech_to_text",
    languages: ["Python"]
},

    ]; // hardcode instead to avoid hitting API limit
    /*
    try {
      // getting all repos
      const response = await axios.get(allReposAPI);
      
      //console.log(response.data);
      // response.data.forEach(({name}) => {
        //console.log(name);
      // })
      // slicing to the length
      
      repoList = [...response.data.slice(0, length)];
      // adding specified repos
      try {
        for (let repoName of specfic) {
          const response = await axios.get(`${specficReposAPI}/${repoName}`);
          repoList.push(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      // setting projectArray
      // TODO: remove the duplication.
      setProjectsArray(repoList);
    } catch (error) {
      console.error(error.message);
    }
    */

    setProjectsArray(repoList);

    //console.log(repoList);
  }, [allReposAPI, length, specfic, specficReposAPI]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);
  

  return (
    <Jumbotron fluid id="projects" className="m-0"
      style={{background: "#becbcf"}}>
      <Container className="">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {projectsArray.length
            ? projectsArray.map((project, index) => (
                <ProjectCard
                  key={`project-card-${index}`}
                  id={`project-card-${index}`}
                  value={project}
                />
              ))
            : dummyProjectsArr.map((project, index) => (
                <ProjectCard
                  key={`dummy-${index}`}
                  id={`dummy-${index}`}
                  value={project}
                />
              ))}
        </Row>
        <p className="lead text-center">
        <a
          className="btn btn-outline-dark btn-lg"
          href="https://github.com/cjbayron"
          target="_blank"
          rel="noreferrer noopener"
          role="button"
        >
          More projects
        </a>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Project;
