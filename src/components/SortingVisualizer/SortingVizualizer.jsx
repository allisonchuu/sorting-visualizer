import React, { useState, useRef, useEffect } from 'react'
import { SortAnimations } from '../../utils/SortingAlgorithms';
import Modal from '@mui/material/Modal';
import 'react-dropdown/style.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SortingVizualizer() {
    // Sort Array Values
    const [initialArray, setInitialArray] = useState(null);
    const [newArray, setNewArray] = useState(null);
    const [activeAlgoName, setActiveAlgoName] = useState("N/A")
    const [bigOEstimate, setBigO] = useState("");

    //Modal Values
    const [open, setOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState(null);

    //Vertical Bar Witdh
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    //Button Values
    const [isSortDisabled, setIsSortDisabled] = useState(true);
    const [isTestDisabled, setIsTestDisabled] = useState(true);

    const handleOpen = () => {
        testSortingAlgorithm();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const generateNewArray = () => {
        const curArray = [];

        setInitialArray(null);
        setActiveAlgoName('N/A');
        setIsSortDisabled(false);
        setIsTestDisabled(false);

        for (let i = 0; i < 50; i++) {
            curArray.push(randomIntFromInterval(5, 500));
        }
        setInitialArray(curArray);
    };

    const handleSortAlgorithm = () => {
        if (activeAlgoName === "N/A") {
            handleOpen();
            return;
        }

        switch (activeAlgoName) {
            case "Merge Sort":
                setBigO('O(nlog(n))');
                mergeSort();
            case "Quick Sort":
                quickSort();
            case "Heap Sort":
                heapSort();
            case "Bubble Sort":
                bubbleSort();
            default:
                console.log('did not work');
        }
    }

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
                    setIsSortDisabled(true);
                }, i * 5);
            } else {
                const [oneIdx, newHeight] = animations[i];

                setTimeout(() => {
                    verticalBars[oneIdx].style.height = `${newHeight}px`;
                    setIsSortDisabled(true);
                }, i * 5);
            }
        }
    };

    const quickSort = () => {
        // const tempArr = initialArray.slice();
        // const { animations } = SortAnimations('Quick Sort', tempArr);

        // setInitialArray(sortedArray);

        // for (let i = 0; i < animations.length; i++) {
        //     const verticalBars = document.getElementsByClassName('vertical-bars');
        //     const onColorChange = i % 3 !== 2;

        //     if (onColorChange) {
        //         const [oneIdx, twoIdx] = animations[i];
        //         const color = i % 3 === 0 ? '#FFB5D7' : '#CEF4FF';

        //         setTimeout(() => {
        //             verticalBars[oneIdx].style.backgroundColor = color;
        //             verticalBars[twoIdx].style.backgroundColor = color;
        //         }, i * 10);
        //     } else {
        //         const [oneIdx, newHeight] = animations[i];

        //         setTimeout(() => {
        //             verticalBars[oneIdx].style.height = `${newHeight}px`;
        //         }, i * 10);
        //         console.log('isheightchange');
        //     }
        // }
    };

    const heapSort = () => {

    };

    const bubbleSort = () => {

    };

    const testSortingAlgorithm = () => {
        if (initialArray == null) {
            setModalMsg('ERROR: Generate a new array.')
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
            setWidth(ref.current.offsetWidth / 50);
        };

        window.addEventListener("resize", getwidth);

        return () => window.removeEventListener("resize", getwidth);
    }, []);

    return (
        <div className='flex place-items-center min-h-screen flex-col p-8 sm:p-16'>
            <h1 className='font-bold text-lg pb-2'>Sorting Visualizer</h1>
            <div className='flex flex-col w-full max-w-[803px] gap-2'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full md:gap-2'>
                    <div className='col-span-1 w-full rounded-lg border-4 border-[#AADBFF] shadow-lg mb-2 md:mb-0 text-xs'>
                        <div className="flex flex-col gap-2 m-5 text-white font-semibold">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort Algorithm</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeAlgoName}
                                    label="Sort Algorithm"
                                    onChange={(event) => setActiveAlgoName(event.target.value)}
                                >
                                    <MenuItem value={'Merge Sort'}>Merge Sort</MenuItem>
                                    <MenuItem value={'Quick Sort'} disabled={true}>Quick Sort</MenuItem>
                                    <MenuItem value={'Heap Sort'} disabled={true}>Heap Sort</MenuItem>
                                    <MenuItem value={'Bubble Sort'} disabled={true}>Bubble Sort</MenuItem>
                                </Select>
                            </FormControl>
                            <button className="flex-none py-1 px-2 bg-[#AADBFF] disabled:bg-[#c4ccd2] rounded-md shadow-lg" disabled={isSortDisabled} onClick={handleSortAlgorithm}>Sort Array</button>
                            <button className="flex-none py-1 px-2 bg-[#AADBFF] disabled:bg-[#c4ccd2] rounded-md shadow-lg" onClick={generateNewArray}>Generate New Array</button>
                            <button className="flex-none py-1 px-2 bg-[#AADBFF] disabled:bg-[#c4ccd2] rounded-md shadow-lg" disabled={isTestDisabled} onClick={handleOpen}>Test Algorithm</button>
                            <div className='flex flex-col place-items-start grow rounded-lg p-3 bg-slate-200 text-slate-500'>
                                <p>Big-O Estimate: <span className='text-slate-800'>{bigOEstimate}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-2 lg:col-span-3 place-content-end w-full lg:w-[600px] h-[535px] rounded-lg border-4 border-[#AADBFF] shadow-lg' ref={ref}>
                        {initialArray === null ? (
                            <div className='flex place-content-center items-center w-full md:w-[485px] lg:w-[600px] h-full italic text-slate-400' onClick={generateNewArray}>Click to Generate a New Array.</div>
                        ) :
                            <div className='flex flex-row w-auto h-[500px] place-items-end mx-5 my-3'>
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
                        } </div>
                </div>
                <div className='flex flex-col place-content-start text-sm w-full h-auto rounded-lg border-4 border-[#AADBFF] shadow-lg px-5 py-3'>
                    <div className='flex flex-col mb-3 w-full items-start'>
                        <h1 className='mb-1'>Initial Array:</h1>
                        {initialArray !== null ?
                            <div className='grid grid-cols-auto-fill w-full border-l border-t'>
                                {initialArray.map((int, idx) =>
                                    <div className='inline-block text-[10px] font-mono border-r'>
                                        <div className='grid grid-col divide-y border-b'>
                                            <span className='text-blue-400 h-5'>{idx}</span>
                                            <span className=''>{int}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <span className='inline italic text-slate-400'>&nbsp;Empty Array</span>
                        }
                    </div>
                    <div className='flex flex-col mb-3 w-full items-start'>
                        <h1 className='mb-1'>Sorted Array:</h1>
                        {newArray !== null ?
                            <div className='grid grid-cols-auto-fill w-full border-l border-t'>
                                {newArray.map((int, idx) =>
                                    <div className='inline-block text-[10px] font-mono border-r'>
                                        <div className='grid grid-col divide-y border-b'>
                                            <span className='text-blue-400 h-5'>{idx}</span>
                                            <span className=''>{int}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <span className='italic text-slate-400'>&nbsp;Empty Array</span>
                        }

                    </div>
                </div>
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
