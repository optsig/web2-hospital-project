import React from 'react'

function FeatureCard({ icon, title, text }) {
    return (
        <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-lg shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
                {icon}
            </div>
            <div className="text-left">
                <h3 className="font-semibold text-xl text-blue-600">{title}</h3>
                <p className="text-gray-700 mt-1">{text}</p>
            </div>
        </div>
    )
}

export default FeatureCard