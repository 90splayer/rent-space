import React from "react";
import getTripById from "../../../../actions/getTripById";



interface IParams {
  tripId: string;
}

const TripPage = async ({ params }: { params: IParams }) => {

  const trip = await getTripById(params);

  if (!trip) {
    return (
      <div>
        Empty
      </div>
    );
  }

  return (
    <div>Trip</div>
  );
}
 
export default TripPage;