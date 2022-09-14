export class User {
    constructor(
        public userId: string,
        public userName: string,
        public userPassword: string,
        public userType: string,
        public isActive: boolean
    ){}
}