import type { User } from "../models/user.model";

export class AccountService {
    private readonly users: User[] = [];

    async createUser(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
}