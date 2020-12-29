import { BaseEntity, Column, Entity, BeforeInsert, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User_Registration } from './User_Registration';

@ObjectType()
@Entity({ name: 'Application_Master' })
export class Application_Master extends BaseEntity {

      @Field(() => Int)
      @PrimaryGeneratedColumn()
      Application_ID: number;

      @Field()
      @Column()
      Application_Name: string;

      @OneToOne(() => User_Registration)
      @JoinColumn()
      Application_Reg_Admin_UserID: User_Registration;

      @Column({ type: 'datetime2' })
      Application_CreationTime: string;

      @Column({ default: 1 })
      Application_ID_Flag: number;

      @BeforeInsert()
      private encryptPassword(): void {
            var date;
            date = new Date();
            date = date.getUTCFullYear()   + '-' +
            pad(date.getUTCMonth() + 1)    + '-' +
            pad(date.getUTCDate())         + ' ' +
            pad(date.getUTCHours())        + ':' +
            pad(date.getUTCMinutes())      + ':' +
            pad(date.getUTCSeconds()); 

            this.Application_CreationTime = date;                    
      }
}

var pad = function(n: any) { return ('00'+n).slice(-2) };