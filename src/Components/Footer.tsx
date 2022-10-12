import React from "react";
import styled from '@emotion/styled'

const AboutMeSection = styled.footer`
    display:flex;
    margin:auto;
    width:80%;
    background-color:lightcyan;
    justify-content:space-around;
    padding: 1% 10%;
    
`

const Footer = () => {
  return (
    <>
      <AboutMeSection className="social_icons">
        <a
          href="https://www.linkedin.com/in/keerthi-alampalli-002750152/"
          target="_blank"
          rel="noreferrer"
          title="keerthi's LinkedIn"
        >
          <i className="fab fa-linkedin-in" />
        </a>
        <a
          href="https://github.com/keerthi1822/ProjectPmon"
          target="_blank"
          rel="noreferrer"
          title="keerthi's github"
        >
          <i className="fab fa-git"></i>
        </a>
        <a
          href="mailto:keerthi1822@gmail.com"
          rel="noreferrer"
          title="Email keerthi"
        >
          {" "}
          <i className="fas fa-at"></i>
        </a>
        <a href="tel:+4591734906" rel="noreferrer" title="call keerthi">
          {" "}
          <i className="fas fa-phone-square-alt"></i>
        </a>

        <a
          href="/Keerthika'sResume.pdf"
          download="Keerthika'sResume.pdf"
          rel="noreferrer"
          title="click for resume"
        >
          <i>
            Keerthika Devi Alampalli{" "}
            <i className="fas fa-cloud-download-alt"></i>
          </i>
        </a>
      </AboutMeSection>
    </>
  );
};

export default Footer;