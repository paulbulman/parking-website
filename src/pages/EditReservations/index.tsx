import { FormEvent, useState } from "react";
import { Prompt } from "../../hooks/prompt";
import { useReservations } from "../../hooks/api/queries/reservations";
import { useEditReservations } from "../../hooks/api/mutations/editReservations";
import { error, success } from "../../utils/notifications";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { ReservationsCalendar } from "../../components/ReservationsCalendar";
import { FormSubmit } from "../../components/FormSubmit";
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
  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    const parameters = { reservations: reservationEdits };
    try {
      await editReservations(parameters);
      setReservationEdits([]);
      success("Reservations saved successfully.");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <>
        <form onSubmit={handleSave}>
          <ReservationsCalendar
            reservationEdits={reservationEdits}
            weeks={data.reservations.weeks}
            shortLeadTimeSpaces={data.shortLeadTimeSpaces}
            users={data.users}
            onChange={handleChange}
          />
          <FormSubmit isLoading={isSaving}>Save</FormSubmit>
        </form>
      </>
    )
  );
  return (
    <>
      <Prompt
        when={reservationEdits.length > 0}
        message="Are you sure? You currently have unsaved changes."
      />
      <Layout
        heading="Edit reservations"
        subheading="Edit reservations up to the end of next month:"
      >
        {content}
      </Layout>
    </>
  );
};
