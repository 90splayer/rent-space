export const dynamic = 'force-dynamic'
import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import EmptyState from "@/app/(website)/components/EmptyState";
import homeimage from "@/public/images/spacehome.jpg";

import getListings, { 
  IListingsParams
} from "@/actions/getListings";
import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Search from "./components/navbar/Search";

interface HomeProps {
  searchParams: IListingsParams
};


const Home = async ({ searchParams }: HomeProps) => {
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
      <div className="h-[50vh] w-full text-white -mt-14 bg-[url('/images/space.png')]">
            <div className="flex flex-col items-center justify-center h-full w-full gap-y-4 ">
              <h1 className="font-bold text-3xl">Find your space</h1>
              <p className="text-center">Want to create and chill, rent a space for as long as you want</p>
              <Search/>
            </div>
        </div>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
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

export default Home;