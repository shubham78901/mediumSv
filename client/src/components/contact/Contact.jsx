import * as React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import Contact from "../../assets/ContactUs.svg"
import DownArrow from "../../assets/downarrow.svg"
function InputField({ label, type, placeholder }) {
  return (
    <div className="input-field">
      <label htmlFor={`${label}-input`} className="visually-hidden">
        {label}
      </label>
      <input
        type={type}
        id={`${label}-input`}
        className="input"
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}

function Checkbox({ label }) {
  return (
    <div className="checkbox-wrapper">
      <input type="checkbox" id={`${label}-checkbox`} className="checkbox" />
      <label htmlFor={`${label}-checkbox`} className="checkbox-label">
        {label}
      </label>
    </div>
  );
}

function ContactForm() {
  return (
    <form className="contact-form">
      <InputField label="Name" type="text" placeholder="Name" />
      <InputField label="Email" type="email" placeholder="Email" />
      <InputField label="Phone number" type="tel" placeholder="Phone number" />

      <div className="select-wrapper">
        <label htmlFor="service-select" className="visually-hidden">
          What you are looking for
        </label>
        <select id="service-select" className="select" aria-label="What you are looking for">
          <option value="">What you are looking for</option>
          {/* Add more options based on available services */}
        </select>
        <img src={DownArrow} alt="" className="select-icon" />
      </div>

      <div className="textarea-wrapper">
        <label htmlFor="message-textarea" className="visually-hidden">
          Message
        </label>
        <textarea
          id="message-textarea"
          className="textarea"
          placeholder="Message"
          aria-label="Message"
          rows="5"
        ></textarea>
      </div>

      <Checkbox label="I have read and accept the privacy policy" />

      <button type="submit" className="submit-button">
        Contact Us
      </button>
    </form>
  );
}

function ContactUs() {
  return (
    <>
    <Navbar/>
      <main className="main-container">
        <div className="content-wrapper">
          <section className="form-section">
            <ContactForm />
          </section>
          <section className="image-section">
            <img src={Contact} alt="" className="contact-image" />
          </section>
        </div>
      </main>
      <Footer/>

      <style jsx>{`
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .main-container {
          padding: 60px 80px 70px;
        }

        @media (max-width: 991px) {
          .main-container {
            padding: 0 20px;
          }
        }

        .content-wrapper {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .content-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .form-section {
          width: 50%;
        }

        @media (max-width: 991px) {
          .form-section {
            width: 100%;
          }
        }

        .contact-form {
          border-radius: 16px;
          box-shadow: 0 30px 50px 0 rgba(0, 0, 0, 0.15);
          border: 1px solid #909090;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          font-size: 16px;
          color: #6b7280;
          font-weight: 400;
          width: 100%;
          padding: 40px 34px;
        }

        @media (max-width: 991px) {
          .contact-form {
            max-width: 100%;
            margin-top: 40px;
            padding: 0 20px;
          }
        }

        .input-field {
          margin-bottom: 24px;
        }

        .input {
          font-family: Barlow, sans-serif;
          border-radius: 4px;
          border: 1px solid #92b0c9;
          background-color: #f3f5f7;
          width: 100%;
          padding: 11px 13px;
        }

        .select-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        .select {
          font-family: Barlow, sans-serif;
          border-radius: 3px;
          border: 1px solid #92b0c9;
          background-color: #f3f5f7;
          width: 100%;
          color: #78848f;
          padding: 11px 13px;
          appearance: none;
        }

        .select-icon {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          pointer-events: none;
        }

        .textarea-wrapper {
          margin-bottom: 24px;
        }

        .textarea {
          font-family: Barlow, sans-serif;
          border-radius: 4px;
          border: 1px solid #92b0c9;
          background-color: #f3f5f7;
          width: 100%;
          padding: 11px 13px;
          resize: none;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 14px;
          color: #374151;
          line-height: 20px;
          padding: 2px 0;
        }

        .checkbox {
          border-radius: 4px;
          border: 1px solid #92b0c9;
          background-color: #fff;
          width: 16px;
          height: 16px;
          margin: 0;
        }

        .checkbox-label {
          font-family: Barlow, sans-serif;
        }

        .submit-button {
          align-self: flex-start;
          border-radius: 8px;
          border: 1px solid #112e45;
          background-color: #112e45;
          margin-top: 42px;
          color: #06e7ed;
          text-align: center;
          text-transform: capitalize;
          padding: 16px 45px 17px;
          font: 600 14px/100% Barlow, -apple-system, Roboto, Helvetica, sans-serif;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .submit-button {
            margin-top: 40px;
            padding: 0 20px;
          }
        }

        .image-section {
          width: 50%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .image-section {
            width: 100%;
            margin-left: 0;
          }
        }

        .contact-image {
          width: 100%;
          margin-top: 22px;
        }

        @media (max-width: 991px) {
          .contact-image {
            max-width: 100%;
            margin-top: 40px;
          }
        }
      `}</style>
    </>
  );
}
export default ContactUs