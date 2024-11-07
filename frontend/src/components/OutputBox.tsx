// OutputBox.tsx

interface OutputBoxProps {
    value: Record<string, number>;
    allOutputs: string[];
}

export function OutputBox({ value, allOutputs }: OutputBoxProps) {
    
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
