import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO } from "entities/users/dto/create-user.dto";
import { UsersService } from "entities/users/users.service";
import { User } from "entities/users/users.model";
import * as bcrypt from "bcryptjs";
import { IResponse } from "common/types";

@Injectable()
export class AuthService {
  constructor (private userService: UsersService, private jwtService: JwtService) {}

  async login (userDto: CreateUserDTO) {
    // const user = await this.userService.getUserByUsername(userDto.username);
    // if (this.validateUser(userDto)) {
    //   console.log("user off");
    //   throw new HttpException("Invalid data", HttpStatus.UNAUTHORIZED);
    // }
    const validatedUser = await this.validateUser(userDto);
    const userToken = await this.generateToken(validatedUser);
    const response: IResponse = {
      count: 1,
      data: userToken,
    };
    return response;
  }

  async register (userDto: CreateUserDTO) {
    const candidate = await this.userService.getUserByUsername(
      userDto.username,
    );
    if (candidate) {
      throw new HttpException("User with this e-mail exists", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    const userToken = await this.generateToken(user);
    const response: IResponse = {
      count: 1,
      data: userToken,
    };
    return response;
  }

  private async generateToken (user: User) {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser (userDto: CreateUserDTO) {
    const user = await this.userService.getUserByUsername(userDto.username);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: "Invalid e-mail or password" });
  }
}
