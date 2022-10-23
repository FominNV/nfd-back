import { ApiProperty } from "@nestjs/swagger/dist";
import { Length } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({ example: "user123", description: "Username" })
  @Length(5, 20, { message: "Length this field must be from 5 to 20 chars" })
  readonly username: string;

  @ApiProperty({ example: "password123456", description: "Password" })
  @Length(5, 20, { message: "Length this field must be from 5 to 20 chars" })
  readonly password: string;
}
