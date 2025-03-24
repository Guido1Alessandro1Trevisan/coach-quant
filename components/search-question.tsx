"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function SearchQuestionbanks() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form className="w-full h-[15vh] flex items-center">
        <input
          placeholder="Search..."
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={searchParams.get("query") || ''}
          className="ml-2 border-b border-gray-300 rounded-full px-2 py-1 focus:outline-none mt-2 w-full"
        />
      </form>
    </Suspense>
  );
}