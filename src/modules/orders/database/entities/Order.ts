import { Customer } from "@/modules/customers/database/entities/Customer";
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id" })
    customer!: Customer;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;
}
