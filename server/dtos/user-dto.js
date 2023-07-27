export default class UserDto {
  email;
  id;
  username;
  constructor(model) {
    this.email = model.email;
    this.username = model.username;
    this.id = model._id;
  }
}
