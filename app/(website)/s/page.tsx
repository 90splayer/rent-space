export const dynamic = 'force-dynamic'

import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import EmptyState from "@/app/(website)/components/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Categories from "../components/navbar/Categories";
import { useDebounce } from 'use-debounce';
import getSearchListings, { SearchListingsParams } from '@/actions/getSearchListings';
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";

interface SearchProps {
  searchParams: SearchListingsParams
};


const Search = async ({ searchParams }: SearchProps) => {
  const listings = await getSearchListings(searchParams);
  const currentUser = await getCurrentUser();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const fetchedListings = await getSearchListings(searchParams);
  //       const fetchedCurrentUser = await getCurrentUser();

  //       setListings(fetchedListings);
  //       setCurrentUser(fetchedCurrentUser);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [searchParams]);

  if(!listings){
    return (
      <div className="flex items-center justify-center">Null</div>
    )
  }

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-[74px] flex flex-col items-center justify-start gap-7 min-h-[90vh]">
        <SearchBar/>
        <EmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
    <div className="max-w-[2520px] mx-auto py-[74px] flex flex-col items-center justify-start gap-7 min-h-[90vh]">
    <SearchBar/>
        <div 
          className=" xl:px-20 md:px-10 sm:px-2 px-4
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-8
            items-center justify-center
          "
        >
          {listings?.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>
    </ClientOnly>
  )
}

export default Search;