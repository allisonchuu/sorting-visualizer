import React from 'react'

export default function VerticalBar({ width, height }) {
    return (
        <div
            className={`inline border border-white bg-blue-400 text-white`}
            style={{
                height: `${height}px`,
                width: `${width}px`
            }}>
        </div>
    )
}

