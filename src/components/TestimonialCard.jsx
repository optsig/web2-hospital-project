import React from 'react'

function TestimonialCard({ quote, name, image }) {
    return (
        <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-slate-100 p-8 rounded">
                <p className="mb-6">"{quote}"</p>
                <div className="flex items-center">
                    <img
                        alt={''}
                        src={image}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex pl-4">
                        <p className="text-blue-600">{name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TestimonialCard