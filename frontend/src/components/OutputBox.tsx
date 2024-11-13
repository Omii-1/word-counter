// OutputBox.tsx

interface OutputBoxProps {
    value: Record<string, number>;
}

export function OutputBox({ value }: OutputBoxProps) {

    const allOutputs: string[] = ["WORDS", "CHARACTERS", "SENTENCES", "PARAGRAPHS"];
    
    return (
        <div className="flex gap-4 mb-6">
            {allOutputs.map((data, index) => (
                <div
                    key={index}
                    className="w-1/4 bg-white text-gray-700 p-4 rounded-lg shadow text-center border"
                >
                    <p className="font-semibold text-lg">{data}</p>
                    <p className="text-blue-500 text-xl font-bold">{value[data]}</p>
                </div>
            ))}
        </div>
    );
}
