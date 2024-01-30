import { Metadata } from 'next';
import "../ui/global.css"
 
export const metadata: Metadata = {
  title: 'Search',
};

export default function Page() {
    return (
        <main>
          <h1 className={`mb-4 text-xl md:text-2xl`}>
            Search
          </h1>
        </main>
      );
  }