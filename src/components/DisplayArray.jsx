import React from 'react'

const DisplayArray = ({ arr, name }) => {
    const arrClassName = name.toLowerCase().concat('-array-item');
    return (
        <div className='flex flex-col mb-3 w-full items-start'>
            <h1 className='mb-1'>{name} Array:</h1>
            {arr !== null ?
                <div className='grid grid-cols-auto-fill w-full border-l border-t'>
                    {arr.map((int, idx) =>
                        <div key={`${arrClassName}-${idx}`} className='inline-block text-[10px] font-mono border-r'>
                            <div
                                className={`grid grid-col divide-y border-b ${arrClassName}`}
                                style={{
                                    backgroundColor: '#FFFFFF'
                                }}
                            >
                                <span className='text-blue-400 h-5'>{idx}</span>
                                <span>{int}</span>
                            </div>
                        </div>
                    )}
                </div>
                :
                <span className='inline italic text-slate-400'>&nbsp;Empty Array</span>
            }
        </div>
    )
}

export default DisplayArray