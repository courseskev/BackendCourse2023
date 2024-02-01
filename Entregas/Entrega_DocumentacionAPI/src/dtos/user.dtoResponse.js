export default class userDtoResponse{
    constructor(user){
        this.firstname = user.first_name;
        this.lastname = user.last_name;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
    }
}