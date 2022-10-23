import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "entities/roles/roles.model";
import { UserRoles } from "entities/roles/user-roles.model";
import { UserCreationAttrs } from "./users.types";

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
    id: number;

  @ApiProperty({ example: "user123", description: "username" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
    username: string;

  @ApiProperty({ example: "password123456", description: "Password" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    password: string;

  @ApiProperty({ example: false, description: "Banned user", default: false })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
    banned: boolean;

  @ApiProperty({ example: "Spamming", description: "Reason for ban" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
