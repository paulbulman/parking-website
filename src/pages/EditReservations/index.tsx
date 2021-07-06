import { useState } from "react";
import { toast } from "react-toastify";
import { useReservations } from "../../hooks/api/queries/reservations";
import { useEditReservations } from "../../hooks/api/mutations/editReservations";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { ReservationsCalendar } from "../../components/ReservationsCalendar";
import { ReservationEdit } from "./types";

export const EditReservationsPage = () => {
  const { data, isLoading, isError } = useReservations();
  const { editReservations, isSaving } = useEditReservations();

  const [reservationEdits, setReservationEdits] = useState<ReservationEdit[]>(
    []
  );

  const handleChange = (reservationEdit: ReservationEdit) => {
    const otherReservationEdits = reservationEdits.filter(
      (existing) => existing.localDate !== reservationEdit.localDate
    );
    setReservationEdits([...otherReservationEdits, reservationEdit]);
  };
  const handleSave = async () => {
    const parameters = { reservations: reservationEdits };
    try {
      await editReservations(parameters);
      setReservationEdits([]);
      toast("Reservations saved successfully.");
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <>
        <ReservationsCalendar
          reservationEdits={reservationEdits}
          weeks={data.reservations.weeks}
          shortLeadTimeSpaces={data.shortLeadTimeSpaces}
          users={data.users}
          onChange={handleChange}
        />
        <button
          onClick={handleSave}
          className="button is-link"
          disabled={isSaving}
        >
          {isSaving ? "Saving" : "Save"}
        </button>
      </>
    )
  );
  return (
    <Layout
      heading="Edit reservations"
      subheading="Edit reservations up to the end of next month:"
    >
      {content}
    </Layout>
  );
};
