import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDefined, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import * as bcrypt from 'bcrypt';

const { CREATE, UPDATE } = CrudValidationGroups;

export enum GenderEnum {
    M = 'm',
    F = 'f'
}

@Entity('users')
export class UserEntity {
    @IsOptional({ always: true })
    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @IsString({ always: true })
    @IsEmail()
    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @IsString({ always: true })
    @IsPhoneNumber("KH")
    @Column({ type: 'varchar', nullable: false, unique: true })
    phone: string;

    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @IsString({ always: true })
    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @IsString({ always: true })
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @IsOptional({ always: true })
    @IsBoolean({ always: true })
    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @IsOptional({ always: true })
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @IsOptional({ always: true })
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @IsOptional({ always: true })
    @Column({ type: 'date', nullable: true })
    dob: Date | undefined;

    @IsOptional({ always: true })
    @IsEnum(GenderEnum, { always: true })
    @Column({ name: 'gender', type: 'enum', nullable: true })
    gender: GenderEnum;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password || '123123', 10);
    }

    @BeforeUpdate()
    async changePassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

}
