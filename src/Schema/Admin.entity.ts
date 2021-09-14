import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @ApiProperty({
    type: String,
    description: 'Autogenerated',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: false })
  firstname: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: false })
  lastname: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    type: Number,
  })
  @Column({ nullable: false })
  role: number;

  @ApiProperty({
    type: String,
    description: 'Autogenerated',
  })
  @Column({
    nullable: true,
    type: 'varchar',
    default: new Date().toISOString(),
  })
  created_at: string;
}
