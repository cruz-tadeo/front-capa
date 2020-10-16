export class User{
    constructor(
        public id?:number,
        public role?:string,
        public name?:string,
        public apellido_paterno?:string,
        public apellido_materno?:string,
        public celular?:string,
        public email?:string,
        public password?:string
    ){
        
    }
}