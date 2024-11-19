import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface SpellError {
    id: string;
    message: string;
    offset: number;
    length: number;
    replacements: string[];
    bad: string;
}

interface TextBoxProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    isSpellChecking: boolean;
    setIsSpellChecking: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TextBox({ text, setText, isSpellChecking, setIsSpellChecking }: TextBoxProps) {
    const [errors, setErrors] = useState<SpellError[]>([]);
    const [selectedError, setSelectedError] = useState<SpellError | null>(null);
    const [suggestionsPosition, setSuggestionsPosition] = useState({ top: 0, left: 0 });
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const checkSpelling = async () => {
        try {
            const response = await axios.post(
                'https://api.textgears.com/check.php',
                new URLSearchParams({
                    text: text,
                    key: 'Yrnj9LEde0FEmTGd'
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            // Sort errors by offset to maintain consistent ordering
            const matches = response.data.errors
                .map((error: any) => ({
                    ...error,
                    message: error.description.en,
                    replacements: error.better
                }))
                .sort((a: SpellError, b: SpellError) => a.offset - b.offset);

            setErrors(matches);
        } catch (error) {
            console.error('Spell check error:', error);
            setIsSpellChecking(false);
        }
    };

    const handleSuggestionClick = (error: SpellError, replacement: string) => {
        if (!error) return;

        const newText =
            text.substring(0, error.offset) +
            replacement +
            text.substring(error.offset + error.length);
        setText(newText);
        setSelectedError(null);

        // Recalculate errors after a short delay to allow text update
        setTimeout(() => {
            checkSpelling();
        }, 100);
    };

    const handleErrorClick = (error: SpellError, event: React.MouseEvent) => {
        event.stopPropagation();
        
        // Find the exact error that was clicked by comparing offsets
        const clickedError = errors.find(e => e.offset === error.offset);
        if (!clickedError) return;
        
        setSelectedError(clickedError);

        if (textAreaRef.current) {
            const textareaRect = textAreaRef.current.getBoundingClientRect();
            const lineHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight);
            const textBeforeError = text.substring(0, error.offset);
            const lines = textBeforeError.split('\n').length - 1;
            
            // Calculate horizontal position based on error's position in the text
            const charsInLastLine = textBeforeError.split('\n').pop()?.length || 0;
            const charWidth = 8; // Approximate character width in pixels
            const horizontalOffset = charsInLastLine * charWidth;

            setSuggestionsPosition({
                top: textareaRect.top + window.scrollY + (lines * lineHeight),
                left: textareaRect.left + window.scrollX + horizontalOffset
            });
        }
    };

    const SuggestionsList = () => {
        if (!selectedError) return null;

        return (
            <div
                className="suggestions-popup"
                style={{
                    position: 'absolute',
                    top: `${suggestionsPosition.top}px`,
                    left: `${suggestionsPosition.left}px`,
                    zIndex: 1000,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    padding: '8px',
                    minWidth: '200px'
                }}
            >
                <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                    {selectedError.message}
                </div>
                <div style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    Incorrect: "{selectedError.bad}"
                </div>
                {selectedError.replacements.slice(0, 5).map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => handleSuggestionClick(selectedError, suggestion)}
                        className="suggestion-item"
                        style={{
                            cursor: 'pointer',
                            padding: '4px 8px',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            borderRadius: '4px',
                            marginBottom: '4px',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                        }}
                    >
                        {suggestion}
                    </div>
                ))}
            </div>
        );
    };

    const Overlay = () => {
        if (!isSpellChecking || !textAreaRef.current) return null;

        const textareaStyles = window.getComputedStyle(textAreaRef.current);
        const lineHeight = parseInt(textareaStyles.lineHeight);
        const paddingTop = parseInt(textareaStyles.paddingTop);

        return (
            <div
                className="spell-check-overlay"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}
            >
                {errors.map((error, index) => {
                    const textBeforeError = text.slice(0, error.offset);
                    const lines = textBeforeError.split('\n').length - 1;
                    const charsInLastLine = textBeforeError.split('\n').pop()?.length || 0;
                    const charWidth = 8; // Approximate character width in pixels

                    return (
                        <div
                            key={error.id || index}
                            onClick={(e) => handleErrorClick(error, e)}
                            style={{
                                position: 'absolute',
                                top: `${lines * lineHeight + paddingTop}px`,
                                left: `${charsInLastLine * charWidth}px`,
                                width: `${error.length * charWidth}px`,
                                height: `${lineHeight}px`,
                                pointerEvents: 'auto',
                                cursor: 'pointer'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '3px',
                                    left: 0,
                                    width: '100%',
                                    borderBottom: '2px wavy red'
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        if (isSpellChecking) {
            checkSpelling();
        } else {
            setErrors([]);
            setSelectedError(null);
        }
    }, [isSpellChecking, text]);

    return (
        <div className="relative w-full h-full" onClick={() => setSelectedError(null)}>
            <textarea
                ref={textAreaRef}
                className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none resize-none"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    setIsSpellChecking(false);
                }}
                placeholder="Start typing, or copy and paste your document here..."
                style={{ fontSize: '16px', lineHeight: '1.5' }}
            />
            {isSpellChecking && <Overlay />}
            <SuggestionsList />
        </div>
    );
}