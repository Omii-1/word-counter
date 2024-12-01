import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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

export function TextBox({
    text,
    setText,
    isSpellChecking,
    setIsSpellChecking,
}: TextBoxProps) {
    const [errors, setErrors] = useState<SpellError[]>([]);
    const [selectedError, setSelectedError] = useState<SpellError | null>(null);
    const [suggestionsPosition, setSuggestionsPosition] = useState({
        top: 0,
        left: 0,
    });
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const checkSpelling = async () => {
        try {
            const response = await axios.post(
                "https://api.textgears.com/check.php",
                new URLSearchParams({
                    text: text,
                    key: "Yrnj9LEde0FEmTGd",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const matches = response.data.errors
                .map((error: any) => ({
                    ...error,
                    message: error.description.en,
                    replacements: error.better,
                }))
                .sort((a: SpellError, b: SpellError) => a.offset - b.offset);

            setErrors(matches);
        } catch (error) {
            console.error("Spell check error:", error);
            setIsSpellChecking(false);
        }
    };

    const handleSuggestionClick = (error: SpellError, replacement: string) => {
        const beforeWord = text.substring(0, error.offset);
        const afterWord = text.substring(error.offset + error.length);
        const newText = `${beforeWord}${replacement} ${afterWord}`.replace(/\s+/g, " ");

        setText(newText.trim());
        setErrors((prev) => prev.filter((e) => e.offset !== error.offset));
        setSelectedError(null);

        if (errors.length === 1) {
            setIsSpellChecking(false);
        }
    };

    const handleUseAsIsClick = (error: SpellError) => {
        setErrors((prev) => prev.filter((e) => e.offset !== error.offset));
        setSelectedError(null);

        if (errors.length === 1) {
            setIsSpellChecking(false);
        }
    };

    const handleErrorClick = (error: SpellError, event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedError(error);

        if (textAreaRef.current) {
            const textareaRect = textAreaRef.current.getBoundingClientRect();
            const lineHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight);
            const textBeforeError = text.substring(0, error.offset);
            const lines = textBeforeError.split("\n").length - 1;
            const charsInLastLine = textBeforeError.split("\n").pop()?.length || 0;
            const charWidth = 8;

            setSuggestionsPosition({
                top: textareaRect.top + window.scrollY + lines * lineHeight,
                left: textareaRect.left + window.scrollX + charsInLastLine * charWidth,
            });
        }
    };

    const HighlightedText = () => {
        if (!isSpellChecking) return text;

        let result = [];
        let lastIndex = 0;

        errors.forEach((error, index) => {
            result.push(text.substring(lastIndex, error.offset));
            result.push(
                <span
                    key={index}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={(e) => handleErrorClick(error, e)}
                >
                    {text.substring(error.offset, error.offset + error.length)}
                </span>
            );
            lastIndex = error.offset + error.length;
        });

        result.push(text.substring(lastIndex));

        return <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>;
    };

    const SuggestionsList = () => {
        if (!selectedError) return null;

        return (
            <div
                className="suggestions-popup"
                style={{
                    position: "absolute",
                    top: `${suggestionsPosition.top}px`,
                    left: `${suggestionsPosition.left}px`,
                    zIndex: 1000,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    padding: "8px",
                    minWidth: "200px",
                }}
            >
                <div style={{ marginBottom: "4px", fontWeight: "bold" }}>
                    {selectedError.message}
                </div>
                <div style={{ marginBottom: "4px", fontStyle: "italic" }}>
                    Incorrect: "{selectedError.bad}"
                </div>
                {selectedError.replacements.slice(0, 5).map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => handleSuggestionClick(selectedError, suggestion)}
                        style={{
                            cursor: "pointer",
                            padding: "4px 8px",
                            backgroundColor: "rgba(0,0,0,0.05)",
                            borderRadius: "4px",
                            marginBottom: "4px",
                            transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                        }}
                    >
                        {suggestion}
                    </div>
                ))}
                <div
                    onClick={() => handleUseAsIsClick(selectedError)}
                    style={{
                        cursor: "pointer",
                        padding: "4px 8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                        marginTop: "8px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Use as is
                </div>
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
            {!isSpellChecking ? (
                <textarea
                    ref={textAreaRef}
                    className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing, or copy and paste your document here..."
                    style={{ fontSize: "16px", lineHeight: "1.5" }}
                />
            ) : (
                <div
                    className="w-full h-full p-4 border border-gray-300 rounded-lg"
                    style={{ fontSize: "16px", lineHeight: "1.5" }}
                >
                    <HighlightedText />
                </div>
            )}
            <SuggestionsList />
        </div>
    );
}
