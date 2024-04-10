import * as React from "react";
import {FaTwitter, FaLinkedin, FaFacebook, FaYoutube} from "react-icons/fa";
const socialMediaLinks = [
  { src: {FaTwitter}, alt: "Twitter" },
  { src: {FaFacebook}, alt: "Facebook" },
  { src: {FaLinkedin}, alt: "Instagram" },
  { src: {FaYoutube}, alt: "LinkedIn" }
];

const NavLink = ({ children }) => (
  <li className="nav-link">{children}</li>
);

const SocialMediaLink = ({ src, alt }) => (
  <img src={src} alt={alt} className="social-media-icon" />
);

const NewsletterForm = () => (
  <form className="newsletter-form">
    <label htmlFor="email" className="sr-only">Enter your email</label>
    <input type="email" id="email" placeholder="Enter your email" className="email-input" />
    <button type="submit" className="subscribe-button">Subscribe</button>
  </form>
);

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="newsletter-section">
          <h2 className="newsletter-title">Subscribe to our newsletter...</h2>
          <NewsletterForm />
        </section>
        <nav className="footer-nav">
          <ul>
            <NavLink>Articles</NavLink>
            <NavLink>Podcasts</NavLink>
            <NavLink>About us</NavLink>
            <NavLink>Contact us</NavLink>
          </ul>
        </nav>
        <section className="social-media-section">
          <h2 className="social-media-title">Follow us on our social handles</h2>
          <div className="social-media-links">
            {socialMediaLinks.map((link, index) => (
              <SocialMediaLink key={index} src={link.src} alt={link.alt} />
            ))}
          </div>
        </section>
      </div>
      <style jsx>{`
  .footer {
    align-items: space-around;
    background-color: var(--akshat-5, #12002a);
    display: flex;
    justify-content: space-around;
    margin-top: 129px;
    padding-top:  60px;
    padding-bottom:  60px;
    width: 100vw;
    margin-bottom:-14vh
  }
  
  .footer-content {
    display: flex;
    gap: 20px;
    justify-content: center;
    max-width: 1120px;
    width: 100%;
  }
  
  .newsletter-section {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    margin: auto 0;
    padding: 0 8px;
  }
  
  .newsletter-title {
    color: #f5f5f5;
    font: 18px/156% Barlow, sans-serif;
  }
  
  .newsletter-form {
    background-color: #20294c;
    border: 1px solid rgba(245, 245, 245, 1);
    border-radius: 6px;
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 24px;
    padding: 4px 4px 4px 16px;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .email-input {
    background-color: transparent;
    border: none;
    color: var(--akshat-1, #7f879e);
    font: 18px Barlow, sans-serif;
    margin: auto 0;
  }
  
  .subscribe-button {
    background-color: #f5f5f5;
    border: none;
    border-radius: 6px;
    color: #20294c;
    cursor: pointer;
    font: 14px/143% Barlow, sans-serif;
    justify-content: center;
    padding: 8px 12px;
    text-align: center;
    white-space: nowrap;
  }
  
  .footer-nav {
    color: #f5f5f5;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    line-height: 143%;
    cursor: pointer;
  }
  
  .nav-link {
    font-family: Barlow, sans-serif;
    margin-top: 24px;
  }
  
  .nav-link:first-child {
    margin-top: 0;
  }
  
  .social-media-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 42px 8px;
  }
  
  .social-media-title {
    color: #f5f5f5;
    font: 500 20px/140% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
  }
  
  .social-media-links {
    align-items: center;
    display: flex;
    gap: 12px;
    margin-top: 16px;
    padding-right: 80px;
  }
  
  .social-media-icon {
    align-self: stretch;
    aspect-ratio: 1;
    margin: auto 0;
    object-fit: auto;
    object-position: center;
    width: 20px;
  }
  
  .social-media-icon:nth-child(3) {
    aspect-ratio: 0.95;
    width: 19px;
  }
  
  .social-media-icon:last-child {
    width: 24px;
  }
  
  @media (max-width: 991px) {
    .footer {
      margin-top: 40px;
      max-width: 100%;
      padding: 0 20px;
    }
    
    .footer-content {
      flex-wrap: wrap;
      max-width: 100%;
    }
    
    .subscribe-button {
      white-space: initial;
    }
    
    .social-media-links {
      padding-right: 20px;
    }
  }
`}</style>
    </footer>
  );
}

export default Footer;