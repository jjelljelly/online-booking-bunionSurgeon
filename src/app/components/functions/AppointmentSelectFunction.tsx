import { Appointment } from "@/app/types/Appointment";
import { usePatientContext } from "@/app/context/patientContext";

export const SPECIALIST = {
    K_NAZIR: "Mr Kaser Nazir",
}

export function useGetNewPatientAppointments(appointmentTypes: Appointment[] | null) {
    const data = usePatientContext()

    // Filter new appointment types and by specialist
    const filterNewApp = appointmentTypes?.filter((appointment: Appointment) => appointment.isNewPatient)
    const kaserNewOnlyAllPayments = filterNewApp?.filter((appointment: Appointment) => appointment.appointmentName === 'Surgical Bunion Consultation with Mr Kaser Nazir')
    return kaserNewOnlyAllPayments
}

export function useGetFollowPatientAppointments(appointmentTypes: Appointment[] | null) {
    const data = usePatientContext()

    // Filter new appointment types and by specialist

    const filterFollowApp = appointmentTypes?.filter((appointment: Appointment) => !appointment.isNewPatient)
    const kaserFollowOnlyAllPayments = filterFollowApp?.filter((appointment: Appointment) => appointment.hasSpecialist(SPECIALIST.K_NAZIR) && (appointment.appointmentName === 'Follow up appointment with Mr Kaser Nazir' || appointment.appointmentName === "Ultrasound guided steroid injection with Mr Kaser Nazir"))
    return kaserFollowOnlyAllPayments
}