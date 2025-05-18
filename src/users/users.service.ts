import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    async findByUsername(username: string) {
        return this.userRepo.findOneBy({ username });
    }
}