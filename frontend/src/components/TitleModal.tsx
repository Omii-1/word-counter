import React from 'react';

interface TitleModalProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
    onClose: () => void;
    isUpdating?: boolean;
}

export const TitleModal: React.FC<TitleModalProps> = ({ title, setTitle, onSave, onClose, isUpdating }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">Enter Title</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onSave}>
                    {isUpdating ? 'Update' : 'Save'}
                </button>
                <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};
