import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import Speech from 'react-text-to-speech';

interface SpeechControlsProps {
    text: string;
}

export const SpeechControls: React.FC<SpeechControlsProps> = ({ text }) => {
    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const handleReadClick = () => {
        setIsReading(true);
        setIsPaused(false);
    };

    const handleCancelClick = () => {
        setIsReading(false);
        setIsPaused(false);
    };

    return (
        <div className="flex">
            {!isReading && (
                <button
                    onClick={handleReadClick}
                    className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out w-full"
                >
                    Read
                </button>
            )}

            {isReading && (
                <div className='flex items-center gap-2'>    
                    <Speech
                    text={text}
                    lang="en-US"
                    />
                
                    <button
                        onClick={handleCancelClick}
                        className="text-red-500 py-2 px-4 rounded flex items-center gap-1"
                    >
                        <ImCross />
                    </button>
                </div>
            )}

        </div>
    );
};
