// ButtonBox.tsx
interface ButtonBoxProps {
    allButtons: string[];
}

export function ButtonBox({ allButtons }: ButtonBoxProps) {
    return (
        <div className="flex flex-col gap-2 justify-between">
            {allButtons.map((data, index) => (
                <button
                    key={index}
                    className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    {data}
                </button>
            ))}
        </div>
    );
}
