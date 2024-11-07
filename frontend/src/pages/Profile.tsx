import { Sidebar } from "../components/Sidebar"
import { Saved } from "../components/Saved"

export function Profile() {
    return (
        <div className="flex w-full h-full">
            <Sidebar />
            <Saved />
        </div>
    )
}
