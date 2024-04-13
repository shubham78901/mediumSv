import * as React from "react";
import { useState } from "react";
import About from "../../../assets/About.png"
export default function MyComponent() {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "Nikhil Matta",
      role: "Software Developer",
      image: About,
    },
    {
      name: "Nikhil Matta",
      role: "Software Developer", 
      image: About,
    },
    {
      name: "Nikhil Matta",
      role: "Software Developer",
      image: About,
    },
    {
      name: "Nikhil Matta", 
      role: "Software Developer",
      image: About,
    },
  ]);
  return (
    <>
      <style jsx>{`
        .team-section {
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
        .team-heading {
          color: #112e45;
          font: 500 40px/120% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .team-heading {
            max-width: 100%;
          }
        }
        .team-members {
          margin-top: 32px;
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .team-members {
            max-width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .member-card {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 25%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .member-card {
            width: 100%;
          }
        }
        .member-image-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-self: stretch;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 0.84;
          flex-grow: 1;
          padding-top: 80px;
          color: #fff;
          font-weight: 500;
        }
        @media (max-width: 991px) {
          .member-image-wrapper {
            margin-top: 24px;
          }
        }
        .member-image {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .member-details {
          position: relative;
          justify-content: flex-end;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          margin-top: 155px;
          width: 100%;
          flex-direction: column;
          padding: 8px;
        }
        @media (max-width: 991px) {
          .member-details {
            margin-top: 40px;
          }
        }
        .member-name {
          font: 20px/140% Barlow, sans-serif;
        }
        .member-role-wrapper {
          display: flex;
          margin-top: 8px;
          padding-right: 10px;
          gap: 8px;
          font-size: 14px;
        }
        .member-role {
          font-family: Barlow, sans-serif;
        }
        .linkedin-icon {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 15px;
          align-self: start;
        }
      `}</style>
      <section className="team-section">
        <h2 className="team-heading">Our team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <article key={index} className="member-card">
              <div className="member-image-wrapper">
                <img
                  loading="lazy"
                  src={member.image}
                  alt={`${member.name}'s profile picture`}
                  className="member-image"
                />
                <div className="member-details">
                  <h3 className="member-name">{member.name}</h3>
                  <div className="member-role-wrapper">
                    <p className="member-role">{member.role}</p>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/27d218e1314c5e2a8133433f3f933c362ba54f72c78499149d6c5abbc198328c?apiKey=b9f73daff245412db60bf67e2f427461&"
                      alt="LinkedIn icon"
                      className="linkedin-icon"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}