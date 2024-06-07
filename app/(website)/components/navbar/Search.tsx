'use client';

import { Listing } from '@prisma/client';
import { useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';

interface IParams{
  listings : Listing[]
}

const Search: React.FC<IParams> = ({ listings })  => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof listings>([]);
  const [search, setSearch] = useState(false);
  const [location, setLocation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setSearch(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setInput(e.target.value);
    // Filter newsItem based on search term
    const filteredListings = listings.filter((listing) =>
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.category[0].toLowerCase().includes(searchTerm) ||
      listing.description?.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredListings);
    setSelect(true);
  };

  const handleBlur = () => {
    setSearch(false);
  };

  const renderListings = searchResults.length > 0 ? searchResults : listings;

  return (
    <div className="rounded-lg border-b border-gray-300 md:flex hidden flex-row items-center justify-center shadow-sm hover:shadow-md cursor-pointer bg-white text-sm">
      <span
        className="flex items-center justify-between gap-2 text-center px-2 py-1"
        onClick={() => setLocation(!location)}
      >
        <MdLocationPin size={18} />
        <input
            ref={inputRef}
            onChange={handleChange}
            value={input}
            id="search"
            name="search"
            required
            type="text"
            placeholder="Search location"
            className="appearance-none text-small bg-transparent font-semibold w-24 h-4 outline-none placeholder:text-gray-400 placeholder:text-xs"
            onBlur={handleBlur}
          />
      </span>
    </div>
  );
};

export default Search;
