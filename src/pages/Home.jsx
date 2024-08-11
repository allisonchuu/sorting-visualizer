import React, { useState, useRef, useEffect } from 'react'
import SortingVizualizer from '../components/SortingVisualizer/SortingVizualizer'
import OptionsBar from '../components/OptionsBar/OptionsBar'

export default function Home() {
    return (
        <div className=''>
            {/* <OptionsBar /> */}
            <SortingVizualizer />
        </div>
    )
}
