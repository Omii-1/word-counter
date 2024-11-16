// ButtonBox.tsx


interface ButtonBoxProps {
    onSaveClick: () => void;
    onClearClick: () => void;
    textId : number | null
}

export function ButtonBox({ onSaveClick, onClearClick, textId }: ButtonBoxProps) {

    const allButtons: string[] = textId ? ["Update", "Upload", "Download", "Clear", "Read", "Spell Check"] : ["Save", "Upload", "Download", "Clear", "Read", "Spell Check"];

    const onClickHandler = (button: string) => {
        console.log(button);
        
        if (button.toLowerCase() === "save" || button.toLowerCase() === "update") {
            onSaveClick();
        } else if (button.toLowerCase() === "clear") {
            onClearClick();
        } else {
            return undefined;
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-between">
            {allButtons.map((button, index) => (
                <button
                    key={index}
                    onClick={ () => onClickHandler(button)}
                    className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    {button}
                </button>
            ))}
        </div>
    );
}
