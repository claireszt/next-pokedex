'use client'
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { fetchAllPokemons, fetchPokemonData } from '@/backend/fetch'; // Import your fetch function
import { formatPokemonSimple } from '@/backend/formatting';
import { IdentificationIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const [clicked, setClicked] = useState(false);
    const [textColor, setTextColor] = useState("white");
    const router = useRouter();

    useEffect(() => {
        for (let id = 1; id <= 9; id++) {
            formatPokemonSimple(id)
        }
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        setClicked(true);
    };

    useEffect(() => {
        if (clicked) {
            const timeout = setTimeout(() => {
                router.push('/home');
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [clicked, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextColor((prevColor) => (prevColor === "text-white" ? "text-red-600" : "text-white"));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className={`flex-grow bg-red-600 flex items-center justify-center transition-all duration-1000 ${clicked ? '-translate-y-full' : ''}`}>
                <p className={`${textColor} text-center font-mono`}>Click the pokeball to start.</p>
            </div>
            <div>
                <Link href='/home' prefetch={true} passHref>
                    <div onClick={handleClick} className={`h-6 bg-black relative flex items-center justify-center transition-all duration-1000 ${clicked ? '-translate-y-full' : ''}`}>
                        <div className="w-40 h-40 bg-black rounded-full relative flex items-center justify-center">
                            <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center transition-all duration-1000 ${clicked ? 'scale-0' : ''}`}>
                                <div className="w-20 h-20 bg-white border-2 border-black rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={`flex-grow bg-white transition-all duration-1000 ${clicked ? 'translate-y-full' : ''}`}></div>
        </div>
    );
};
