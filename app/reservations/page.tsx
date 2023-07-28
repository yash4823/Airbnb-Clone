import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorised"
          subtitle="please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if(reservations.length === 0){
    return (
      <ClientOnly>
        <EmptyState
          title="No reservation found"
          subtitle="Looks like no reservation found on your property."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
};

export default ReservationPage;