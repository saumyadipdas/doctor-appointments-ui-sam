export class Appointment {
    constructor(
        public appointmentId: string,
        public appointmentTitle: string,
        public appointmentStatus: string,
        public appointmentStartDateTime: string,
        public appointmentEndDateTime: string,
        public responsibleDoctorId: string
    ){}
}