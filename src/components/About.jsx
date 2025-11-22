import React from 'react'
import ImageBlock from './ImageBlock'

function About() {
  return (
    <section id='about' className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className='text-blue-600 text-3xl md:text-4xl font-serif font-extrabold text-center'>Who We Are</h1>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-12'>
          <ImageBlock
            url={'/assets/pexels-chokniti-khongchum-1197604-2280551.jpg'}
            text={"Our state-of-the-art facilities ensure top-notch care and comfort for every patient"}
          />
          <ImageBlock
            url={'/assets/pexels-thirdman-5327915.jpg'}
            text={"Compassionate and skilled healthcare professionals dedicated to your well-being"}
          />
          <ImageBlock
            url={'/assets/pexels-chokniti-khongchum-1197604-3082452.jpg'}
            text={"Innovative medical technology, providing accurate diagnostics and effective treatment"}
          />
        </div>
      </div>
    </section>
  )
}

export default About