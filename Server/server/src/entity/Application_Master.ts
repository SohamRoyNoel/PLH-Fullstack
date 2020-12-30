import { BaseEntity, Column, Entity, BeforeInsert, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User_Registration } from './User_Registration';

@ObjectType()
@Entity({ name: 'Application_Master' })
export class Application_Master extends BaseEntity {

      @Field(() => Int)
      @PrimaryGeneratedColumn()
      Application_ID: number;

      @Field()
      @Column({ unique: true })
      Application_Name: string;

      @ManyToOne(type => User_Registration, ur => ur.ApplicationMaster)
      @JoinColumn()
      Application_Reg_Admin_UserID: number;

      @Column({ type: 'datetime2', default:createDate() })
      Application_CreationTime: string;

      @Column({ default: 1 })
      Application_ID_Flag: number;      
      
}

function pad(n: any) { return ('00'+n).slice(-2) };

function createDate(): String {
      var date;
      date = new Date();
      date = date.getUTCFullYear()   + '-' +
      pad(date.getUTCMonth() + 1)    + '-' +
      pad(date.getUTCDate())         + ' ' +
      pad(date.getUTCHours())        + ':' +
      pad(date.getUTCMinutes())      + ':' +
      pad(date.getUTCSeconds())      + '.' +
      pad(date.getUTCMilliseconds());
              
      return date;
}