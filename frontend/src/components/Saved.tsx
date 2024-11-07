import { MdDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";

interface DataItem {
    id: string;
    name: string;
    title: string;
    text: string;
    date: string;
}

const data : DataItem[] = [
    {
        id: "duhfudhfn3r38u3i3j",
        name: "OmJuvatkar",
        title: "Email For om juvatkar",
        text: `Hello Om Juvatkar,

We are pleased to provide an opportunity to you to participate in a sponsored project. You will be creating a Word Counting Web application. The project duration is of 15 days. This is the maximum duration that the project may take. If you commit more time, you should be able to complete the project much sooner.

Please refer the following Word Counting websites to understand this project. This will help you get a better idea of the features that you will be developing. Try to understand the UI as well as the functionality of the web app. You will need to try all features. Choose a few basic features you would like to include in your Web app. Do not worry about implementing all features.`,
        date: "7 Nov 2024 11:53 PM",
    },
    {
        id: "duhfudhfn3r38u3i3j",
        name: "OmJuvatkar",
        title: "Email For om juvatkar",
        text: `Hello Om Juvatkar,

We are pleased to provide an opportunity to you to participate in a sponsored project. You will be creating a Word Counting Web application. The project duration is of 15 days. This is the maximum duration that the project may take. If you commit more time, you should be able to complete the project much sooner.

Please refer the following Word Counting websites to understand this project. This will help you get a better idea of the features that you will be developing. Try to understand the UI as well as the functionality of the web app. You will need to try all features. Choose a few basic features you would like to include in your Web app. Do not worry about implementing all features.`,
        date: "7 Nov 2024 11:53 PM",
    }
]

export function Saved() {
    return (
        <div className="border-l border-blue-500 w-[75%] min-h-[590px] p-4">

            <h1 className="text-blue-500 text-4xl font-bold">Saved Data</h1>

            <div className="py-4 w-full flex flex-col gap-5 justify-center items-center">

                {
                    data.map((item) => (
                        <div className="border flex shadow-lg px-2 py-3 pcursor-pointer rounded bg-gray-100 w-full gap-2">
                            <div className="flex gap-4 text-center w-4/5 justify-between">
                                <div>
                                    <label htmlFor="" className="text-blue-500">Date</label>
                                    <p>{item.date}</p>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-blue-500">Username</label>
                                    <p>{item.name}</p>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-blue-500">Title</label>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 w-1/5 justify-end">
                                <button className="border rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white px-1 transition-all duration-300"><MdLogout size={25} />
                                </button>
                                <button className="border rounded text-red-500 border-red-500 hover:bg-red-500 hover:text-white px-1 transition-all duration-300"><MdDeleteOutline size={25} />
                                </button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}
