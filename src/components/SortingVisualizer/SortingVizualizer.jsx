import React, { useState, useRef, useEffect } from 'react'
import { SortAnimations } from '../../utils/SortingAlgorithms';
import Modal from '@mui/material/Modal';
import 'react-dropdown/style.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayArray from '../DisplayArray';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import FullLogo from '../../assets/sortingvisualizerlogo.png'

export default function SortingVizualizer() {
    // Sort Array Values
    const [initialArray, setInitialArray] = useState(null);
    const [jsSortedArray, setJSSortedArray] = useState(null);
    const [newArray, setNewArray] = useState(null);
    const [activeAlgoName, setActiveAlgoName] = useState("")
    const [bigOEstimate, setBigO] = useState("");

    //Modal Values
    const [open, setOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState(null);

    //Vertical Bar Width
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    //Button Values
    const [isSortDisabled, setIsSortDisabled] = useState(true);
    const [isTestDisabled, setIsTestDisabled] = useState(true);

    // Audio Context
    let audioCtx = null;
    const [soundOn, setSoundOn] = useState(true);

    const handleOpen = async () => {
        await testSortingAlgorithm();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const generateNewArray = () => {
        const curArray = [];

        setInitialArray(null);
        setNewArray(null);
        setJSSortedArray(null);

        setActiveAlgoName('');

        setIsSortDisabled(false);

        const highestId = window.setTimeout(() => {
            if (highestId !== 0) {
                for (let i = highestId; i >= 0; i--) {
                    window.clearInterval(i);
                }
            }
        }, 0);

        for (let i = 0; i < 100; i++) {
            let randInt = randomIntFromInterval(5, 500);

            if (curArray.find((value) => value === randInt)) {
                curArray.push(randomIntFromInterval(5, 500));
            } else {
                curArray.push(randInt);
            }
        }
        setInitialArray(curArray);
        setJSSortedArray(curArray.toSorted((a, b) => a - b))
    };

    const handleSortAlgorithm = async () => {
        if (activeAlgoName === "") {
            handleOpen();
            return;
        }

        switch (activeAlgoName) {
            case "Merge Sort":
                setBigO('O(nlog(n))');
                mergeSort();
                break;
            case "Quick Sort":
                quickSort();
                break;
            case "Heap Sort":
                heapSort();
                break;
            case "Bubble Sort":
                bubbleSort();
                break;
            default:
                console.log('did not work');
        }
    }

    const mergeSort = () => {
        const tempArr = initialArray.slice();
        const { sortedArray, animations } = SortAnimations('Merge Sort', tempArr);
        setNewArray(sortedArray);
        setIsSortDisabled(true);
        setIsTestDisabled(false);
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
                }, i * 5);
            } else {
                const [oneIdx, newHeight] = animations[i];

                setTimeout(() => {
                    verticalBars[oneIdx].style.height = `${newHeight}px`;
                    playNote(newHeight + 300);
                }, i * 5);
            }
        }
    };

    const quickSort = () => {
        // const tempArr = initialArray.slice();
        // const { sortedArray, animations } = SortAnimations('Quick Sort', tempArr);
        // setNewArray(sortedArray);

        // console.log("sortedArray", sortedArray);
        // console.log("animations", animations);

        // for (let i = 0; i < animations.length; i++) {
        //     const verticalBars = document.getElementsByClassName('vertical-bars');
        //     const onColorChange = i % 3 !== 2;

        //     if (onColorChange) {
        //         const [oneIdx, twoIdx] = animations[i];
        //         const color = i % 3 === 0 ? '#FFB5D7' : '#CEF4FF';

        //         setTimeout(() => {
        //             verticalBars[oneIdx].style.backgroundColor = color;
        //             verticalBars[twoIdx].style.backgroundColor = color;
        //         }, i * 50);
        //     } else {
        //         const [oneIdx, twoIdx, newOneHeight, newTwoHeight] = animations[i];

        //         if (newOneHeight) {
        //             setTimeout(() => {
        //                 verticalBars[oneIdx].style.height = `${newOneHeight}px`;
        //                 verticalBars[twoIdx].style.height = `${newTwoHeight}px`;
        //                 //playNote(newOneHeight + 300);
        //             }, i * 5);
        //         } else {
        //             setTimeout(() => {
        //                 verticalBars[oneIdx].style.height = `${twoIdx}px`;
        //                 //playNote(newOneHeight + 300);
        //             }, i * 5);
        //         }
        //     }
        // }
    };

    const heapSort = () => {

    };

    const bubbleSort = () => {

    };

    const testSortingAlgorithm = async () => {
        const testAnimationsArr = [];

        setIsTestDisabled(true);

        if (initialArray == null) {
            setModalMsg('ERROR: Generate a new array.')
        } else {
            if (activeAlgoName === "") {
                setModalMsg('ERROR: No active sorting. Choose a sorting algorithm.');
                return;
            }

            if (await arraysAreEqual(newArray, jsSortedArray, testAnimationsArr)) {
                await testAnimations(testAnimationsArr);
                setModalMsg(activeAlgoName + ': PASSED');
            } else {
                await testAnimations(testAnimationsArr);
                setModalMsg(activeAlgoName + ': FAILED');
            }
        }

        await new Promise(r => setTimeout(r, newArray.length * 100));
    };

    const playNote = (freq) => {
        if (audioCtx === null) {
            audioCtx = new AudioContext();
        }

        const dur = 0.1;
        const osc = audioCtx.createOscillator();

        osc.type = 'triangle';

        osc.frequency.value = freq;

        if (soundOn) {
            osc.start();
            osc.stop(audioCtx.currentTime + dur);
        }
        osc.connect(audioCtx.destination)
    }

    useEffect(() => {
        setWidth(ref.current.offsetWidth);

        const getwidth = () => {
            setWidth(ref.current.offsetWidth / 100);
        };

        window.addEventListener("resize", getwidth);

        return () => window.removeEventListener("resize", getwidth);
    }, []);

    return (
        <div className='flex place-items-center min-h-screen flex-col p-8 sm:p-16'>
            <div className='flex flex-col w-full max-w-[803px] gap-2'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full md:gap-2'>
                    <div className='col-span-1 w-full rounded-lg border-4 border-[#AADBFF] shadow-lg mb-2 md:mb-0 text-xs'>
                        <div className="flex flex-col gap-2 m-5 text-white font-semibold">
                            <img src={FullLogo} alt="Sorting Visualizer Logo" className='w-full pb-1 px-2 md:px-0' />
                            <FormControl size="small" className='shadow-md'>
                                <InputLabel id="sort-algo-label">Sorting Algorithm</InputLabel>
                                <Select
                                    labelId="sort-algo-label"
                                    id="sort-algo"
                                    value={activeAlgoName}
                                    label="Sorting Algorithm"
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
                    <div className='md:col-span-2 lg:col-span-3 place-content-end w-full lg:w-[600px] h-[535px] rounded-lg border-4 border-[#AADBFF] shadow-lg relative' ref={ref}>
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
                        }
                        {soundOn ? (
                            <button className="absolute text-slate-300 top-3 left-3 h-8 w-8 disabled:text-slate-100" disabled={isSortDisabled} onClick={() => setSoundOn(false)}>
                                <SpeakerWaveIcon title="Speaker On" />
                            </button>
                        ) : (
                            <button className="absolute text-slate-300 top-3 left-3 h-8 w-8 disabled:text-slate-100" disabled={isSortDisabled} onClick={() => setSoundOn(true)}>
                                <SpeakerXMarkIcon title="Speaker Off" />
                            </button>
                        )}
                    </div>

                </div>
                <div className='flex flex-col place-content-start text-sm w-full h-auto rounded-lg border-4 border-[#AADBFF] shadow-lg px-5 py-3'>
                    <DisplayArray arr={initialArray} name={'Initial'}></DisplayArray>
                    <DisplayArray arr={newArray} name={'Sorted'}></DisplayArray>
                    <DisplayArray arr={jsSortedArray} name={'Expected'}></DisplayArray>
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

async function arraysAreEqual(arrOne, arrTwo, animations) {
    if (arrOne.length !== arrTwo.length) return false;

    let isValidValues = [];

    for (let i = 0; i < arrOne.length; i++) {
        animations.push({ idx: i });
        if (arrOne[i] !== arrTwo[i]) {
            isValidValues.push(false);
            animations.push({ idx: i, isValid: false });
        } else {
            isValidValues.push(true);
            animations.push({ idx: i, isValid: true });
        }
    }

    return isValidValues.every(Boolean);
}

async function testAnimations(animations) {
    const expectedArrItems = document.getElementsByClassName('expected-array-item');
    const sortArrItems = document.getElementsByClassName('sorted-array-item');

    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 2 !== 1;
        const currAnimationIdx = animations[i].idx;

        if (isColorChange) {
            setTimeout(() => {
                expectedArrItems[currAnimationIdx].style.backgroundColor = '#bae6fd';
                sortArrItems[currAnimationIdx].style.backgroundColor = '#bae6fd';
            }, i * 20);
        } else {
            if (animations[i].isValid) {
                setTimeout(() => {
                    expectedArrItems[currAnimationIdx].style.backgroundColor = '#ffffff';
                    sortArrItems[currAnimationIdx].style.backgroundColor = '#bbf7d0';
                }, i * 20);
            } else {
                setTimeout(() => {
                    expectedArrItems[currAnimationIdx].style.backgroundColor = '#fecaca';
                    sortArrItems[currAnimationIdx].style.backgroundColor = '#fecaca';
                }, i * 20);
            }
        }
    }
}