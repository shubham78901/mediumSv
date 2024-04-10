// import * as React from "react";

// function AuthorInfo({ author, role }) {
//   return (
//     <div className="author-info">
//       <img src={author.image} alt={author.name} className="author-image" />
//       <div className="author-details">
//         <div className="author-name-wrapper">
//           <h3 className="author-name">{author.name}</h3>
//           <img src="/path/to/verified-icon.png" alt="Verified" className="verified-icon" />
//         </div>
//         <p className="author-role">{role}</p>
//       </div>
//     </div>
//   );
// }

// function PostReactions({ likes, duration }) {
//   return (
//     <div className="post-reactions">
//       <div className="likes-wrapper">
//         <img src="/path/to/like-icon.png" alt="Likes" className="like-icon" />
//         <span className="likes-count">{likes}</span>
//       </div>
//       <p className="video-duration">{duration}</p>
//     </div>
//   );
// }

// function TrendingPost({ post }) {
//   return (
//     <article className="trending-post">
//       <AuthorInfo author={post.author} role={post.authorRole} />
//       <p className="post-content">
//         {post.content}{" "}
//         <a href={post.readMoreLink} className="read-more-link">
//           read more
//         </a>
//       </p>
//       <img src={post.image} alt={post.imageAlt} className="post-image" />
//       <PostReactions likes={post.likes} duration={post.duration} />
//     </article>
//   );
// }

// function VideoPost({ post }) {
//   return (
//     <article className="video-post">
//       <AuthorInfo author={post.author} role={post.authorRole} />
//       <div className="video-wrapper">
//         <img src={post.thumbnailImage} alt="" className="video-thumbnail" />
//         <img src={post.video} alt={post.videoAlt} className="video-player" />
//       </div>
//       <h2 className="video-title">{post.title}</h2>
//       <PostReactions likes={post.likes} duration={post.duration} />
//     </article>
//   );
// }

// function MyComponent() {
//   const trendingPosts = [
//     {
//       author: {
//         name: "Nikhil Matta",
//         image: Avatar1,
//       },
//       authorRole: "Software Developer",
//       content:
//         "Big Blocker's Web3 Meetup on the ReFi Revolution in India was EPIC. Organized at DevX Indore many college students and startup founders were enlightened by how blockchain is impacting the green revolution...",
//       readMoreLink: "#",
//       image: Post1,
//       imageAlt: "Trending post image",
//       likes: 112,
//       duration: "10:12",
//     },
//   ];

//   const videoPosts = [
//     {
//       author: {
//         name: "Nikhil Matta",
//         image: Avatar1,
//       },
//       authorRole: "Software Developer",
//       thumbnailImage: Thumbnail1,
//       video: Video1,
//       videoAlt: "Behind the scenes of blockchain",
//       title: "Behind the scenes of blockchain",
//       likes: 112,
//       duration: "10:12",
//     },
//   ];

//   return (
//     <>
//       <section className="trending-today">
//         <h1 className="section-title">Trending today</h1>
//         <nav className="filter-nav">
//           <button className="filter-button active">All updates</button>
//           <button className="filter-button">Articles</button>
//           <button className="filter-button">Podcasts</button>
//         </nav>
//         {trendingPosts.map((post, index) => (
//           <TrendingPost key={index} post={post} />
//         ))}
//         {videoPosts.map((post, index) => (
//           <VideoPost key={index} post={post} />
//         ))}
//       </section>

//       <style jsx>{`
//         .trending-today {
//           align-self: stretch;
//           border-radius: 16px;
//           box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(144, 144, 144, 1);
//           background-color: #fff;
//           display: flex;
//           flex-direction: column;
//           padding: 24px;
//           margin: 12vh;
//         }

//         @media (max-width: 991px) {
//           .trending-today {
//             padding: 0 20px;
//           }
//         }

//         .section-title {
//           color: #112e45;
//           font: 500 40px/120% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
//         }

//         @media (max-width: 991px) {
//           .section-title {
//             max-width: 100%;
//           }
//         }

//         .filter-nav {
//           display: flex;
//           margin-top: 32px;
//           padding-right: 80px;
//           gap: 20px;
//           font-size: 18px;
//           color: #112e45;
//           font-weight: 500;
//           line-height: 156%;
//         }

//         @media (max-width: 991px) {
//           .filter-nav {
//             flex-wrap: wrap;
//             padding-right: 20px;
//           }
//         }

//         .filter-button {
//           font-family: Barlow, sans-serif;
//           justify-content: center;
//           border-radius: 8px;
//           border: 1px solid rgba(17, 46, 69, 1);
//           white-space: nowrap;
//           padding: 12px 16px;
//           background-color: transparent;
//           cursor: pointer;
//         }

//         .filter-button.active {
//           border-color: rgba(135, 203, 255, 1);
//           background-color: #112e45;
//           color: #06e7ed;
//         }

//         @media (max-width: 991px) {
//           .filter-button {
//             white-space: initial;
//           }
//         }

//         .trending-post {
//           border-radius: 8px;
//           box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(144, 144, 144, 1);
//           background-color: #fff;
//           display: flex;
//           margin-top: 32px;
//           flex-direction: column;
//           color: #112e45;
//           padding: 16px;
//         }

//         @media (max-width: 991px) {
//           .trending-post {
//             max-width: 100%;
//           }
//         }

//         .author-info {
//           display: flex;
//           gap: 8px;
//         }

//         @media (max-width: 991px) {
//           .author-info {
//             flex-wrap: wrap;
//           }
//         }

//         .author-image {
//           aspect-ratio: 1;
//           object-fit: cover;
//           width: 50px;
//           border-radius: 50%;
//           margin: auto 0;
//         }

//         .author-details {
//           display: flex;
//           flex-direction: column;
//           flex: 1;
//         }

//         @media (max-width: 991px) {
//           .author-details {
//             max-width: 100%;
//           }
//         }

//         .author-name-wrapper {
//           display: flex;
//           gap: 16px;
//           font-size: 20px;
//           font-weight: 500;
//           line-height: 140%;
//         }

//         @media (max-width: 991px) {
//           .author-name-wrapper {
//             flex-wrap: wrap;
//           }
//         }

//         .author-name {
//           font-family: Barlow, sans-serif;
//           flex: 1;
//           margin: 0;
//         }

//         @media (max-width: 991px) {
//           .author-name {
//             max-width: 100%;
//           }
//         }

//         .verified-icon {
//           aspect-ratio: 1;
//           object-fit: contain;
//           width: 18px;
//           margin: auto 0;
//         }

//         .author-role {
//           font: 400 18px/156% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
//           margin: 0;
//         }

//         @media (max-width: 991px) {
//           .author-role {
//             max-width: 100%;
//           }
//         }

//         .post-content {
//           color: #0173cd;
//           margin-top: 16px;
//           font: 400 20px/28px Montserrat, -apple-system, Roboto, Helvetica, sans-serif;
//         }

//         @media (max-width: 991px) {
//           .post-content {
//             max-width: 100%;
//           }
//         }

//         .read-more-link {
//           font-weight: 500;
//           font-size:18px;
//           color: rgba(1, 115, 205, 1);
//         }

//         .post-image {
//           aspect-ratio: 1.47;
//           object-fit: cover;
//           width: 100%;
//           border: 1px solid rgba(144, 144, 144, 1);
//           border-left: none;
//           border-right: none;
//           margin-top: 12px;
//         }

//         @media (max-width: 991px) {
//           .post-image {
//             max-width: 100%;
//           }
//         }

//         .post-reactions {
//           display: flex;
//           margin-top: 16px;
//           gap: 16px;
//           font-weight: 400;
//           white-space: nowrap;
//           padding: 0 8px;
//         }

//         @media (max-width: 991px) {
//           .post-reactions {
//             flex-wrap: wrap;
//             white-space: initial;
//           }
//         }

//         .likes-wrapper {
//           display: flex;
//           gap: 6px;
//           font-size: 18px;
//           line-height: 156%;
//           flex: 1;
//         }

//         @media (max-width: 991px) {
//           .likes-wrapper {
//             flex-wrap: wrap;
//             white-space: initial;
//           }
//         }

//         .like-icon {
//           aspect-ratio: 1;
//           object-fit: contain;
//           width: 18px;
//           margin: auto 0;
//         }

//         .likes-count {
//           font-family: Barlow, sans-serif;
//           flex: 1;
//         }

//         @media (max-width: 991px) {
//           .likes-count {
//             max-width: 100%;
//           }
//         }

//         .video-duration {
//           margin: auto 0;
//           font: 16px/150% Barlow, sans-serif;
//         }

//         .video-post {
//           border-radius: 8px;
//           box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(144, 144, 144, 1);
//           background-color: #fff;
//           display: flex;
//           margin-top: 32px;
//           flex-direction: column;
//           padding: 16px;
//         }

//         @media (max-width: 991px) {
//           .video-post {
//             max-width: 100%;
//           }
//         }

//         .video-wrapper {
//           position: relative;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           overflow: hidden;
//           min-height: 705px;
//           margin-top: 16px;
//           padding: 80px 60px;
//         }

//         @media (max-width: 991px) {
//           .video-wrapper {
//             max-width: 100%;
//             padding: 0 20px;
//           }
//         }

//         .video-thumbnail {
//           position: absolute;
//           inset: 0;
//           height: 100%;
//           width: 100%;
//           object-fit: cover;
//         }

//         .video-player {
//           aspect-ratio: 1;
//           object-fit: contain;
//           width: 200px;
//           max-width: 100%;
//           margin: 173px 0 122px;
//         }

//         @media (max-width: 991px) {
//           .video-player {
//             margin: 40px 0;
//           }
//         }

//         .video-title {
//           color: #112e45;
//           margin: 12px 0 0;
//           font: 400 20px/140% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
//         }

//         @media (max-width: 991px) {
//           .video-title {
//             max-width: 100%;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// export default MyComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";

function MyComponent() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   let isMounted = true;

  //   axios.get("http://localhost:8000/posts")
  //     .then((response) => {
  //       if (isMounted) {
  //         setPosts(response.data);
  //         console.log(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <section className="all-posts">
      <h1 className="section-title">All Posts</h1>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h2 className="post-title">{post.heading}</h2>
          <div className="author-info">
            {/* <img src={post.author.image} alt={post.author.name} className="author-image" /> */}
            <div className="author-details">
              <div className="author-name-wrapper">
                <h3 className="author-name">{post.author.name}</h3>
                <img src="/path/to/verified-icon.png" alt="Verified" className="verified-icon" />
              </div>
              <p className="author-role">{post.authorRole}</p>
            </div>
          </div>
          <p className="post-content">{post.content}</p>
          <div className="post-reactions">
            <div className="likes-wrapper">
              <img src="/path/to/like-icon.png" alt="Likes" className="like-icon" />
              <span className="likes-count">{post.likes}</span>
            </div>
            <p className="video-duration">{post.duration}</p>
          </div>
        </div>
      ))}
      <style jsx>{`
        .all-posts {
          margin-top: 20px;
        }
        .post {
          margin-bottom: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
        }
        .post-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #333;
        }
        .author-info {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .author-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .author-details {
          display: flex;
          flex-direction: column;
        }
        .author-name-wrapper {
          display: flex;
          align-items: center;
        }
        .author-name {
          font-weight: bold;
        }
        .verified-icon {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
        .author-role {
          font-size: 0.8rem;
          color: gray;
        }
        .post-content {
          line-height: 1.5;
          color: #555;
        }
        .post-reactions {
          display: flex;
          align-items: center;
        }
        .likes-wrapper {
          display: flex;
          align-items: center;
          margin-right: 20px;
        }
        .like-icon {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .likes-count {
          font-weight: bold;
        }
        .video-duration {
          font-size: 0.8rem;
          color: gray;
        }
      `}</style>
    </section>
  );
}

export default MyComponent;
