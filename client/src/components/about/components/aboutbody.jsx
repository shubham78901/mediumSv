import * as React from "react";
import leftConsultation from "../../../assets/lefthalfcircle.png";
import centralCircle from "../../../assets/centrehalfcircle.png";
import rightHalfCircle from "../../../assets/righthalfcircle.png";
const ProcessColumn = ({ imageSrc, imageAlt, title, description }) => (
  <div className="process-column">
    <img src={imageSrc} alt={imageAlt} className="process-image" />
    <div className="process-content">
      <h3 className="process-title">{title}</h3>
      <p className="process-description">{description}</p>
    </div>
  </div>
);

const processData = [
  {
    imageSrc: leftConsultation,
    imageAlt: "Consultation process",
    title: "Consultation",
    description:
      "Communication is the key to create artwork that exceed expectations",
  },
  {
    imageSrc: centralCircle,
    imageAlt: "Creation process",
    title: "Creation",
    description: "Meticulous attention to detail and craftsmanship",
  },
  {
    imageSrc: rightHalfCircle,
    imageAlt: "Feedback process",
    title: "Feedback",
    description: "We value your input throughout the creation process",
  },
  {
    imageSrc: rightHalfCircle,
    title: "Delivery",
    description: "High-quality artwork that brings joy to your space.",
  },
];

 function aboutbody() {
  return (
    <>
      <section className="process-section">
        <h2 className="section-title">Our Process</h2>
        <div className="process-details">
          {processData.map((process, index) => (
            <ProcessColumn key={index} {...process} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .process-section {
          align-self: stretch;
          border-radius: 8px;
          box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(144, 144, 144, 1);
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          margin: 12vh;

        }

        .section-title {
          color: #112e45;
          font: 500 40px/120% Barlow, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        @media (max-width: 991px) {
          .section-title {
            max-width: 100%;
          }
        }

        .process-images {
          align-self: center;
          margin-top: 32px;
          width: 100%;
          max-width: 849px;
          display: flex;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .process-images {
            max-width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .process-column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
        }

        @media (max-width: 991px) {
          .process-column {
            width: 100%;
          }
        }

        .process-image {
          aspect-ratio: 2.33;
          object-fit: auto;
          object-position: center;
          width: 100%;
          border: 1px dashed rgba(163, 163, 163, 1);
          margin-top: 28px;
          flex-grow: 1;
        }

        .process-image:last-child {
          border-style: solid;
        }

        .process-details {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .process-details {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .process-content {
          align-self: stretch;
          border-radius: 16px;
          background-color: #112e45;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          color: #ebebeb;
          width: 100%;
          padding: 20px 16px;
        }

        @media (max-width: 991px) {
          .process-content {
            margin-top: 16px;
          }
        }

        .process-title {
          font: 500 20px/140% Barlow, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .process-description {
          margin-top: 16px;
          font: 400 16px/28px Barlow, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
    </>
  );
}
export default aboutbody