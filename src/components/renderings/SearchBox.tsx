'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchBoxProps = {
  inputLabel: string;
  inputPlaceholder: string;
};

export function SearchBox({ inputLabel, inputPlaceholder }: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') ?? '');

  const actionText = useMemo(() => (value.trim() ? 'Search records' : 'Browse examples'), [value]);

  return (
    <form
      id="archive-search"
      role="search"
      className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-soft md:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        const trimmed = value.trim();
        if (trimmed) {
          params.set('q', trimmed);
        } else {
          params.delete('q');
        }
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <label htmlFor="family-tree-search" className="mb-2 block text-sm font-semibold text-slate-700">
        {inputLabel}
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id="family-tree-search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={inputPlaceholder}
          className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none ring-0 transition focus:border-slate-500"
        />
        <button type="submit" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white md:w-auto">
          {actionText}
        </button>
      </div>
    </form>
  );
}
