import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "entities/users/users.model";
import { UserRoles } from "./user-roles.model";
import { RoleCreationAttrs } from "./roles.types";

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
    id: number;

  @ApiProperty({ example: "admin", description: "Value of a role" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
    value: string;

  @ApiProperty({ example: "This role can add and change all the tables", description: "Description of the current role" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
      users: User[];
}
