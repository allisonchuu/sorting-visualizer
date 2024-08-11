import React, { useState, useRef, useEffect } from 'react'
import { SortAnimations } from '../../utils/SortingAlgorithms';
import Modal from '@mui/material/Modal';
import 'react-dropdown/style.css';

export default function SortingVizualizer() {
    const [initialArray, setInitialArray] = useState(null);
    const [newArray, setNewArray] = useState(null);
    const [width, setWidth] = useState(0);
    const [activeAlgoName, setActiveAlgoName] = useState("N/A")
    const [open, setOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState(null);

    const ref = useRef(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        testSortingAlgorithm();
        setOpen(true);
    };

    const generateNewArray = () => {
        const curArray = [];

        setInitialArray(null);
        setActiveAlgoName('N/A');

        for (let i = 0; i < 100; i++) {
            curArray.push(randomIntFromInterval(5, 500));
        }
        setInitialArray(curArray);
    };

    const mergeSort = () => {
        const tempArr = initialArray.slice();
        const { sortedArray, animations } = SortAnimations('Merge Sort', tempArr);
        setNewArray(sortedArray);
        setActiveAlgoName('Merge Sort');

        for (let i = 0; i < animations.length; i++) {
            const verticalBars = document.getElementsByClassName('vertical-bars');
            const onColorChange = i % 3 !== 2;

            if (onColorChange) {
                const [oneIdx, twoIdx] = animations[i];
                const color = i % 3 === 0 ? '#FFB5D7' : '#CEF4FF';

                setTimeout(() => {
                    verticalBars[oneIdx].style.backgroundColor = color;
                    verticalBars[twoIdx].style.backgroundColor = color;
                }, i * 10);
            } else {
                const [oneIdx, newHeight] = animations[i];

                setTimeout(() => {
                    verticalBars[oneIdx].style.height = `${newHeight}px`;
                }, i * 10);
                console.log('isheightchange');
            }
        }
    };

    const quickSort = () => {
        const tempArr = initialArray.slice();
        const { animations } = SortAnimations('Quick Sort', tempArr);

        // setInitialArray(sortedArray);

        for (let i = 0; i < animations.length; i++) {
            const verticalBars = document.getElementsByClassName('vertical-bars');
            const onColorChange = i % 3 !== 2;

            if (onColorChange) {
                const [oneIdx, twoIdx] = animations[i];
                const color = i % 3 === 0 ? '#FFB5D7' : '#CEF4FF';

                setTimeout(() => {
                    verticalBars[oneIdx].style.backgroundColor = color;
                    verticalBars[twoIdx].style.backgroundColor = color;
                }, i * 10);
            } else {
                const [oneIdx, newHeight] = animations[i];

                setTimeout(() => {
                    verticalBars[oneIdx].style.height = `${newHeight}px`;
                }, i * 10);
                console.log('isheightchange');
            }
        }
    };

    const heapSort = () => {

    };

    const bubbleSort = () => {

    };

    const testSortingAlgorithm = () => {
        if (initialArray == null) {
            setModalMsg('ERROR: {Generate a new array.')
        } else {
            const jsSortedArr = initialArray.toSorted((a, b) => a - b);

            if (activeAlgoName === "N/A") {
                setModalMsg('ERROR: No active sorting. Choose a sorting algorithm.');
                return;
            }

            if (arraysAreEqual(newArray, jsSortedArr)) {
                setModalMsg(activeAlgoName + ': PASSED');
            }
        }
    };

    useEffect(() => {
        setWidth(ref.current.offsetWidth);

        const getwidth = () => {
            setWidth(ref.current.offsetWidth / 100);
        };

        window.addEventListener("resize", getwidth);

        return () => window.removeEventListener("resize", getwidth);
    }, []);

    return (
        <div className='flex col-span-3 place-items-center min-h-screen flex-col p-20'>
            <h1 className='font-bold pb-2'>Sorting Visualizer</h1>
            {initialArray === null ? (
                <div className='place-content-center w-5/6 min-w-[575px] max-w-3xl h-[535px] rounded-lg border-4 border-[#AADBFF] px-5 py-3 shadow-lg' ref={ref}>
                    <div className='italic text-slate-400' onClick={generateNewArray}>Click to Generate a New Array.</div>
                </div>
            ) :
                <div className='place-content-end w-5/6 min-w-[575px] max-w-3xl h-[535px] rounded-lg border-4 border-[#AADBFF] px-5 py-3 shadow-lg' ref={ref}>

                    <div className='flex flex-row h-fit place-items-end'>
                        {
                            (initialArray.map((int, idx) =>
                                <div key={idx}
                                    className="vertical-bars inline border border-white text-white"
                                    style={{
                                        height: `${int}px`,
                                        width: `${width}px`,
                                        backgroundColor: `#CEF4FF`
                                    }}>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

            <div className="flex flex-row gap-2 m-5 text-white font-semibold text-sm">
                <button className="py-1 px-2 bg-[#AADBFF] rounded-md shadow-lg" onClick={generateNewArray}>Generate New Array</button>
                <button className="py-1 px-2 bg-[#AADBFF] rounded-md shadow-lg" onClick={mergeSort}>Merge Sort</button>
                <button className="py-1 px-2 bg-slate-400 rounded-md shadow-lg" disabled onClick={quickSort}>Quick Sort</button>
                <button className="py-1 px-2 bg-slate-400 rounded-md shadow-lg" disabled onClick={heapSort}>Heap Sort</button>
                <button className="py-1 px-2 bg-slate-400 rounded-md shadow-lg" disabled onClick={bubbleSort}>Bubble Sort</button>
                <button className="py-1 px-2 bg-[#AADBFF] rounded-md shadow-lg" onClick={handleOpen}>Test Algorithm</button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-auto w-auto max-w-72 bg-sky-50 rounded-lg border-2 border-slate-400 flex items-center justify-center px-8 py-5"
                >{modalMsg}</div>
            </Modal>
        </div >
    )
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrOne, arrTwo) {
    if (arrOne.length !== arrTwo.length) return false;

    for (let i = 0; i < arrOne.length; i++) {
        if (arrOne[i] !== arrTwo[i]) return false;
    }

    return true;
}
