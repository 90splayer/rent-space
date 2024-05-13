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
    <div className="rounded-2xl border border-gray-300 flex flex-row items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer bg-white divide-solid divide-x text-sm">
      <span
        className="flex items-center justify-between gap-2 text-center p-2"
        onClick={handleSearchClick}
      >
        <BiSearch size={18} />
        {search && (
          <input
            ref={inputRef}
            onChange={handleChange}
            value={input}
            id="search"
            name="search"
            required
            type="text"
            placeholder=""
            className="appearance-none text-small bg-transparent font-semibold w-12 outline-none placeholder:text-gray-400"
            onBlur={handleBlur}
          />
        )}
      </span>
      <span
        className="flex items-center justify-between gap-2 text-center p-2"
        onClick={() => setLocation(!location)}
      >
        <MdLocationPin size={18} />
      </span>
    </div>
  );
};

export default Search;
