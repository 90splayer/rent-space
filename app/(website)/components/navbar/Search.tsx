'use client';

import { Listing } from '@prisma/client';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import useSearchModal from '@/app/hooks/useSearchModal';

interface IParams {
  listings: Listing[];
}

const Search: React.FC<IParams> = ({ listings }) => {
  const [searchResults, setSearchResults] = useState<typeof listings>([]);
  const searchModal = useSearchModal();

  const onSearch = () => {
    if (searchModal.isOpen) {
      searchModal.onClose();
    } else {
      searchModal.onOpen();
    }
  };

  return (
    <div onClick={onSearch} className="flex flex-row items-end justify-center cursor-pointer">
      <div className="flex items-center justify-center gap-1 text-center px-2 py-1 text-sm">
        <BiSearch size={14} />
        <p>Search</p>
      </div>
    </div>
  );
};

export default Search;
