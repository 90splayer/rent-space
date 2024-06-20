import React from 'react'

import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import EmptyState from "@/app/(website)/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/actions/getListings";
import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Categories from "../components/navbar/Categories";

interface HomeProps {
  searchParams: IListingsParams
};


const Search = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if(!listings){
    return (
      <div className="flex items-center justify-center">Null</div>
    )
  }

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
    <Categories/>
      <Container>
        <div 
          className="
            pt-52
            py-28
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
      </Container>
    </ClientOnly>
  )
}

export default Search;