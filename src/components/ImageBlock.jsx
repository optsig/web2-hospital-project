import React from 'react'

function ImageBlock({url, altText, text}) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
        <img
          src={url}
          alt={text}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm md:text-base text-center">{text}</p>
      </div>
    </article>
  )
}

export default ImageBlock