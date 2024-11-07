// TextArea.tsx
import React from 'react';

interface TextAreaProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export function TextBox({ text, setText }: TextAreaProps) {
    return (
        <textarea
            className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing, or copy and paste your document here..."
        ></textarea>
    );
}
