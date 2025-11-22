import React from 'react'
import TestimonialCard from './TestimonialCard';

function Testimonials() {
  return (
    <div>
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-bold font-serif text-blue-600 mb-12 text-center" id="reviews">
          Testimonials
        </h1>
        <div className="flex flex-wrap -m-4">
          <TestimonialCard
            quote="The staff was incredibly kind and attentive. I felt truly cared for during my visit"
            name="Holden Caulfield"
            image="assets/pexels-tim-douglas-6567336.jpg"
          />
          <TestimonialCard
            quote="The doctors took the time to explain everything clearly. I left feeling confident in my treatment"
            name="Alper Kamu"
            image="assets/pexels-kampus-5920775.jpg"
          />
          <TestimonialCard
            quote="Booking an appointment was so easy. I had everything confirmed in minutes!"
            name="Samantha Lee"
            image="assets\pexels-kampus-8636600.jpg"
          />

          <TestimonialCard
            quote="I found a specialist just five minutes from my home. The whole process was seamless."
            name="Carlos Mendoza"
            image="assets\pexels-gabby-k-6238089.jpg"
          />

          <TestimonialCard
            quote="The interface is clean and intuitive. I didn’t need any help navigating the platform."
            name="Fatima Noor"
            image="assets/pexels-karola-g-4498509.jpg"
          />

          <TestimonialCard
            quote="From booking to follow-up, everything was smooth and professional. Highly recommend this service!"
            name="James O'Connor"
            image="assets\pexels-ono-kosuki-5648100.jpg"
          />
        </div>
      </div>
    </div>
  );

}

export default Testimonials