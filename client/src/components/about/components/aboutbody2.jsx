import * as React from "react";

function AboutBody() {
  return (
    <section className="about-us">
      <h2 className="title">About us</h2>
      <h3 className="subtitle">We are creaters</h3>
      <p className="description">
      Welcome to mediumSv, your gateway to an immersive journey through the ever-evolving landscape of technology and innovation. As avid explorers of the digital realm, we are passionate about uncovering the latest trends and developments in AI, blockchain, VR, and beyond. Through our engaging content and dynamic podcast, we invite you to embark on a captivating odyssey, where each episode unveils fresh insights, expert perspectives, and thought-provoking discussions. Whether you're a seasoned tech enthusiast or a curious newcomer, join us as we navigate the forefront of innovation and shape the future together.
      </p>
      <h3 className="subtitle">Our motive</h3>
      <p className="description">
      our mission is to revolutionize the digital content landscape through blockchain technology. 
        
        <br />
        We're committed to empowering content creators by leveraging blockchain's decentralized ledger to facilitate secure microtransactions. Through our platform, creators can monetize their creativity directly, without intermediaries, while offering audiences the chance to support them seamlessly through microtransactions.
        <br />
        By harnessing the power of blockchain, we ensure transparent and tamper-proof transactions, providing creators with a fair and efficient way to earn from their content. Join us as we pioneer a new era of digital content monetization, where innovation thrives, and creators are truly empowered to succeed.
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