export default class FirebaseConfig {
    public readonly project_id = "winston-bot-768f2";
    public readonly private_key_id:string;
    public readonly private_key:string;
    public readonly client_email = "firebase-adminsdk-4aox4@winston-bot-768f2.iam.gserviceaccount.com";

    constructor(private_key_id:string, private_key:string){
        this.private_key_id = private_key_id;
        this.private_key = private_key;
    }
}
