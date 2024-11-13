// ButtonBox.tsx
interface ButtonBoxProps {
    onSaveClick: () => void;
}

export function ButtonBox({ onSaveClick }: ButtonBoxProps) {

    const allButtons: string[] = ["Save", "Upload", "Download", "Clear", "Read", "Spell Check"];

    return (
        <div className="flex flex-col gap-2 justify-between">
            {allButtons.map((button, index) => (
                <button
                    key={index}
                    onClick={button.toLowerCase() === "save" ? onSaveClick : undefined}
                    className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    {button}
                </button>
            ))}
        </div>
    );
}
