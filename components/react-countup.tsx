"use client"
import CountUp from 'react-countup';

export default function QuestionsNum() {

    return(
        <div className="lg:w-[68px] w-[64px] h-10 relative">
            <CountUp end={601} className="absolute top-[0px] left-[0px]"/>
        </div>
    )
}