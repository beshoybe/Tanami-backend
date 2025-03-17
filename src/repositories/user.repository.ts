import { injectable } from "tsyringe";
import User from "../models/user.model";

@injectable()
class UserRepository {

  async findByEmail(email: string) {
    return await User. findOne({ where: { email } });
  }

  async findById(id?: string) {
    return await User.findByPk(id);
  }

  async createUser(userData: any) {
    return User.create(userData);
  }
}

export default UserRepository;
