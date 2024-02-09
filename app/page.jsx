import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow bg-red-600 flex items-center justify-center">
                <p className="text-white text-center font-mono">Click the pokeball to start.</p>
            </div>
            <Link href='/home'>
            <div className="h-6 bg-black relative flex items-center justify-center">
                <div className="w-40 h-40 bg-black rounded-full relative flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                        <div className="w-20 h-20 bg-white border-2 border-black rounded-full"></div>
                    </div>
                </div>
            </div>
            </Link>
            <div className="flex-grow bg-white"></div>
        </div>
    );
};
