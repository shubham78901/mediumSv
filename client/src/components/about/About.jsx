import * as React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import AboutBody from "../about/components/aboutbody";
import AboutUsBody2 from "../about/components//aboutbody2";
import AboutUsBody3 from "../about/components/aboutbody3";
import Solar from "../../assets/solar-system.svg.png"
import CodingGuy from "../../assets/CodingGuy.svg"
import About2 from "../../assets/About2.svg"
import About3 from "../../assets/About3.svg"
import About4 from "../../assets/About4.png"

function TechNerdImage() {
  return (
    <div className="tech-nerd-image">
      <img src={About2} alt="Tech nerd icon" className="icon" />
      <div className="label flex flex-wrap">Tech nerds?</div>
    </div>
  );
}

function ContentCreatorImage() {
  return (
    <div className="content-creator-image">
      <img src={About3} alt="Content creator icon" className="icon" />
      <div className="label">Content creators?</div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <section className="who-are-we">
        <h2 className="title">Who are we?</h2>
        <div className="content">
          <div className="columns">
            <div className="column tech-nerds">
              <div className="content-wrapper">
                <TechNerdImage />
                <img src={Solar} alt="Tech nerds" className="image" />
              </div>
            </div>
            <div className="column main-image">
              <img src={CodingGuy} alt="Who are we" className="image" />
            </div>
            <div className="column content-creators">
              <div className="content-wrapper">
                <ContentCreatorImage />
                <img src={About4} alt="Content creators" className="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AboutBody/>
      <AboutUsBody2/>
      <AboutUsBody3/>
      <Footer/>

      <style jsx>{`
        .who-are-we {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          padding: 30px 0;
          margin: 12vh;
        }

        .title {
          color: #112e45;
          text-align: center;
          align-self: center;
          font: 500 40px/120% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
          margin: 0;
        }

        .content {
          margin-top: 16px;
          width: 100%;
          padding: 0 20px;
        }

        @media (max-width: 991px) {
          .content {
            max-width: 100%;
          }
        }

        .columns {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .columns {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
        }

        .tech-nerds,
        .content-creators {
          width: 27%;
        }

        @media (max-width: 991px) {
          .tech-nerds,
          .content-creators {
            width: 100%;
          }
        }

        .main-image {
          width: 45%;
          margin: 0 20px;
        }

        @media (max-width: 991px) {
          .main-image {
            width: 100%;
            margin: 40px 0 0;
          }
        }

        .content-wrapper {
          border-color: rgba(231, 236, 247, 1);
          border-style: solid;
          background-color: #fafbfd;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 18px;
          color: #112e45;
          font-weight: 500;
          line-height: 156%;
          width: 100%;
          padding: 0 0 53px;
        }

        .tech-nerds .content-wrapper {
          border-right-width: 2px;
          text-align: right;
          padding-right: 17px;
        }

        .content-creators .content-wrapper {
          border-left-width: 2px;
          padding-left: 18px;
        }

        @media (max-width: 991px) {
          .content-wrapper {
            margin-top: 28px;
          }
        }

        .tech-nerd-image,
        .content-creator-image {
          display: flex;
          flex-direction: column;
        }

        .tech-nerd-image {
          align-self: end;
          width: 95px;
        }

        .icon {
          width: 24px;
          aspect-ratio: 1;
          object-fit: contain;
        }

        .tech-nerd-image .icon {
          align-self: end;
        }

        .label {
          font-family: Barlow, sans-serif;
          margin-top: 16px;
        }

        .image {
          width: 100%;
          margin-top: 16px;
          object-fit: contain;
        }

        .tech-nerds .image,
        .content-creators .image {
          max-width: 384px;
        }

        .tech-nerds .image {
          aspect-ratio: 0.9;
        }

        .main-image .image {
          aspect-ratio: 1.39;
          align-self: stretch;
          margin: auto 0;
        }

        @media (max-width: 991px) {
          .main-image .image {
            max-width: 100%;
          }
        }

        .content-creators .image {
          aspect-ratio: 0.92;
        }
      `}</style>
    </>
  );
}