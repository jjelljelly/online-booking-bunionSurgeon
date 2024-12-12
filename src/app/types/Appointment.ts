export class Appointment {
    // declaring what properties are in the class
    appointmentName: string
    appointmentLength: number
    specialistincluded: string[]
    paymentType: string[]
    withinNursingHours: boolean
    appointmentFee: number
    newPatient: boolean
    key: string
    cardImage: any
    type: string

    // constructor is private (developers cannot create an instance with "new Appointment()", they must use build method)
    private constructor(
        appointmentName: string,
        appointmentLength: number,
        specialistincluded: string[],
        paymentType: string[],
        withinNursingHours: boolean,
        appointmentFee: number,
        newPatient: boolean,
        key: string,
        cardImage: any,
        type: string
    ) {
        this.appointmentName = appointmentName,
            this.appointmentLength = appointmentLength,
            this.specialistincluded = specialistincluded,
            this.paymentType = paymentType,
            this.withinNursingHours = withinNursingHours,
            this.appointmentFee = appointmentFee,
            this.newPatient = newPatient,
            this.key = key,
            this.cardImage = cardImage,
            this.type = type
    }

    // how to create an instance, this allows us to convert between two types and guarantee that we have all properties
    static build({
        appointmentName,
        appointmentLength,
        specialistincluded,
        paymentType,
        withinNursingHours,
        appointmentFee,
        newPatient,
        key,
        cardImage,
        type
    }: Appointment) {
        return new Appointment(
            appointmentName,
            appointmentLength,
            specialistincluded,
            paymentType,
            withinNursingHours,
            appointmentFee,
            newPatient,
            key,
            cardImage,
            type
        )
    }

    //getters
    get typeOfPayment(): string[] {
        return this.paymentType
    }

    get lengthOfAppoinment(): number {
        return this.appointmentLength
    }

    get isNewPatient(): boolean {
        return this.newPatient
    }

    get appointmentKey(): string {
        return this.key
    }

    get nurseRequired(): boolean {
        return this.withinNursingHours
    }

    get checkAppointmentFee(): number {
        return this.appointmentFee
    }

    hasSpecialist(specialist: string): boolean {
        return this.specialistincluded.includes(specialist)
    }

    hasPaymentMethod(paymentMethod: string) {
        return this.paymentType.includes(paymentMethod)
    }

    hasAppointmentName(appointmentName: string) {
        return this.appointmentName.includes(appointmentName)
    }

    hasAppointmentKey(appointmentKey: string) {
        return this.key.includes(appointmentKey)
    }

}