import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "entities/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UserRolesType } from "./users.types";

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser (dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(UserRolesType.ADMIN);
    user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers () {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByUsername (username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }

  async addRole (dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException(
      "User or role is not found",
      HttpStatus.NOT_FOUND,
    );
  }

  async ban (dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException(
        "User is not found",
        HttpStatus.NOT_FOUND,
      );
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
