import { OmitType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UserResponse extends OmitType(UserEntity, ['password']) {}