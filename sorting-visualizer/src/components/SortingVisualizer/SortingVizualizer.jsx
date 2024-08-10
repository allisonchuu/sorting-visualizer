import React, { useState, useRef, useEffect } from 'react'
import VerticalBar from '../ui/VerticalBar';
import { MergeSort } from '../../utils/SortingAlgorithms';

export default function SortingVizualizer() {
    const [newArray, setNewArray] = useState(null);
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    const generateNewArray = () => {
        const curArray = []

        for (let i = 0; i < 20; i++) {
            curArray.push(randomIntFromInterval(5, 500));
        }
        setNewArray(curArray);
    };

    useEffect(() => {
        // when the component gets mounted
        setWidth(ref.current.offsetWidth);
        // to handle page resize
        const getwidth = () => {
            setWidth(ref.current.offsetWidth / 20);
        };
        window.addEventListener("resize", getwidth);
        // remove the event listener before the component gets unmounted
        return () => window.removeEventListener("resize", getwidth);
    }, []);

    const mergeSort = () => {
        setNewArray(MergeSort(newArray));
        console.log(MergeSort(newArray));
    };

    const quickSort = () => {

    };

    const heapSort = () => {

    };

    const bubbleSort = () => {

    };

    return (
        <div className='flex place-items-center min-h-screen flex-col p-20'>
            <div className='w-5/6 min-w-96 h-[515px] flex flex-row place-items-end' ref={ref}>
                {newArray !== null && newArray.map((int, id) =>
                    <VerticalBar key={id} width={width} height={int} />
                )}
            </div>
            <div className="flex flex-row gap-2 m-5 text-white text-sm">
                <button className="py-1 px-2 bg-blue-950 rounded-md" onClick={generateNewArray}>Generate New Array</button>
                <button className="py-1 px-2 bg-blue-950 rounded-md" onClick={mergeSort}>Merge Sort</button>
                <button className="py-1 px-2 bg-blue-950 rounded-md" onClick={quickSort}>Quick Sort</button>
                <button className="py-1 px-2 bg-blue-950 rounded-md" onClick={heapSort}>Heap Sort</button>
                <button className="py-1 px-2 bg-blue-950 rounded-md" onClick={bubbleSort}>Bubble Sort</button>
            </div>
        </div >
    )
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

