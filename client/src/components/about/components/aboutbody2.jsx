import * as React from "react";

function AboutBody() {
  return (
    <section className="about-us">
      <h2 className="title">About us</h2>
      <h3 className="subtitle">We are coders</h3>
      <p className="description">
        Welcome to Maharaja TentHouse, your premier partner in creating
        unforgettable outdoor experiences. Our team of seasoned professionals is
        dedicated to providing personalized service, meticulous attention to
        detail, and creative solutions to exceed your expectations
      </p>
      <h3 className="subtitle">Our motive</h3>
      <p className="description">
        We specialize in transforming ordinary spaces into extraordinary venues,
        tailored to your unique vision and occasion.
        <br />
        We understand the importance of every event, whether it's a dreamy
        wedding, a corporate gala, or a lively celebration.
        <br />
        With our extensive inventory of high-quality tents, furniture, lighting,
        and decor, we have everything you need to bring your event to life, rain
        or shine.
      </p>

      <style jsx>{`
        .about-us {
          align-self: stretch;
          background-color: #fff;
          border: 1px solid rgba(144, 144, 144, 1);
          border-radius: 8px;
          box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
          color: #112e45;
          display: flex;
          flex-direction: column;
          font-weight: 500;
          padding: 24px 16px;
          margin: 12vh;
        }

        .title {
          font: 40px/120% Barlow, sans-serif;
        }

        .subtitle {
          font: 28px Barlow, sans-serif;
          margin-top: 32px;
        }

        .description {
          font: 400 20px/28px Barlow, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin-top: 16px;
        }

        @media (max-width: 991px) {
          .title,
          .subtitle,
          .description {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default AboutBody;