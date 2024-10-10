import React from 'react'
import FullLogo from '../assets/sortingvisualizerlogo.png'
import GithubLogo from '../assets/socialmedia/githublogo.png'
import LinkedinLogo from '../assets/socialmedia/linkedinlogo.png'
import DevpostLogo from '../assets/socialmedia/devpostlogo.png'

export default function Footer() {
    return (
        <div className='flex place-items-center min-w-screen bg-slate-100 h-40 flex-col px-8 sm:px-16'>
            <div className='flex flex-col w-full max-w-[803px] gap-2 py-7'>
                <div className="grid grid-cols-1 sm:grid-cols-3 text-slate-600 items-start">
                    <div className='col-span-1'>
                        <img src={FullLogo} alt="Sorting Visualizer Logo" className='w-44 pb-1 px-1' />
                        <h1 className='flex items-start text-xs ml-1'>©2024 Allison Chu. All Rights Reserved.</h1>
                    </div>
                    <div className="flex flex-row text-slate-600 items-start py-3 px-1 sm:px-3">
                        <a href="https://github.com/allisonchuu/sorting-visualizer">
                            <img src={GithubLogo} alt="Github Logo" className='w-11 pr-2' />
                        </a>
                        <a href="https://www.linkedin.com/in/ucrallisonchu">
                            <img src={LinkedinLogo} alt="Linkedin Logo" className='w-11 pr-2' />
                        </a>
                        <a href="https://devpost.com/allisonchuu">
                            <img src={DevpostLogo} alt="Devpost Logo" className='w-12 pr-2' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
