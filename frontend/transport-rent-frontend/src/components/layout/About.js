import React from 'react';
import './About.css';

function About() {
  return (
    <main className="main">
      <h1>Welcome to Our Rental Company</h1>
      <section className="about-introduction">
        <p>
          We are a leading transportation rental company specializing in providing high-quality vehicles for your travel needs. Our mission is to offer a seamless and enjoyable rental experience, ensuring you have the perfect vehicle for your journey.
        </p>
      </section>

      <section className="about-history">
        <h2>Our History</h2>
        <p>
          Founded in 1992, our company has grown from a small, local business to a trusted and reliable provider of rental services. We have always been committed to offering a diverse fleet of vehicles to cater to various customer preferences and requirements.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Customer satisfaction:</strong> We prioritize our customers' needs and strive to exceed their expectations.</li>
          <li><strong>Quality:</strong> We maintain a high standard of service and offer top-of-the-line vehicles to ensure your comfort and safety.</li>
          <li><strong>Integrity:</strong> We operate with honesty, transparency, and respect in all of our business dealings.</li>
          <li><strong>Innovation:</strong> We continually seek new ways to improve our services and stay at the forefront of the rental industry.</li>
          <li><strong>Flexibility:</strong> We provide a wide range of vehicle options and rental plans to accommodate the diverse needs of our customers.</li>
          <li><strong>Environmentally conscious:</strong> We promote eco-friendly practices and offer environmentally-friendly vehicle options.</li>
          <li><strong>Reliability:</strong> We ensure our vehicles are well-maintained and serviced regularly to provide a worry-free rental experience.</li>
          <li><strong>Community engagement:</strong> We actively participate in local community events and support charitable causes.</li>
          <li><strong>Growth:</strong> We are committed to the ongoing development of our employees and the growth of our business.</li>
        </ul>
      </section>


      <section className="about-team">
        <h2>Our Team</h2>
        <p>
          Our team consists of dedicated professionals who share our passion for excellent service. With years of experience in the industry, our staff is committed to helping you find the perfect rental vehicle for your needs.
        </p>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance, please don't hesitate to reach out to our customer support team. We're always here to help!
        </p>
      </section>
    </main>
  );
}

export default About;
