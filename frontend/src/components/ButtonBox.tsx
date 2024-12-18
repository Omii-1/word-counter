// ButtonBox.tsx
import React from "react";
import { SpeechControls } from "./SpeechControls";

interface ButtonBoxProps {
    onSaveClick: () => void;
    onClearClick: () => void;
    onDownloadClick: () => void;
    onExtractText: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    onSpellCheck: () => void;
    isSpellChecking: boolean;
    textId: number | null;
    text: string;
}

export function ButtonBox({
    onSaveClick,
    onClearClick,
    onDownloadClick,
    onExtractText,
    onSpellCheck,
    isSpellChecking,
    textId,
    text
}: ButtonBoxProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Define available buttons based on whether we're editing existing text
    const allButtons: string[] = textId
        ? ["Update", "Upload", "Download", "Clear", "Read", "Spell Check"]
        : ["Save", "Upload", "Download", "Clear", "Read", "Spell Check"];

    // Common button styles
    const buttonStyles = {
        base: `
            border bg-blue-500 text-white py-2 px-4 rounded-lg shadow 
            hover:bg-blue-600 transition duration-300 ease-in-out
            disabled:bg-gray-400 disabled:cursor-not-allowed
        `
    };

    // Handle button clicks
    const onClickHandler = (button: string) => {
        switch (button.toLowerCase()) {
            case "save":
            case "update":
                onSaveClick();
                break;
            case "clear":
                onClearClick();
                break;
            case "download":
                onDownloadClick();
                break;
            case "upload":
                fileInputRef.current?.click();
                break;
            case "spell check":
                onSpellCheck();
                break;
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-between">
            <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                onChange={onExtractText}
                className="hidden"
            />
            {allButtons.map((button, index) => (
                button === "Read" ? (
                    <SpeechControls key={index} text={text} />
                ) : (
                    <button
                        key={index}
                        onClick={() => onClickHandler(button)}
                        className={buttonStyles.base}
                        disabled={button === "Spell Check" && !text.trim()}
                    >
                        {button}
                    </button>
                )
            ))}
        </div>
    );
}