import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface PaymentRecord {
    customerName: string;
    status: PaymentStatus;
    plan: string;
    email: string;
    timestamp: Time;
    phone: string;
    amount: bigint;
    transactionId?: string;
}
export enum PaymentStatus {
    Failed = "Failed",
    Completed = "Completed",
    Pending = "Pending"
}
export interface backendInterface {
    createPaymentRequest(customerName: string, email: string, phone: string, plan: string, amount: bigint): Promise<string>;
    getAllCompletedPayments(): Promise<Array<PaymentRecord>>;
    getAllPayments(): Promise<Array<PaymentRecord>>;
    getPaymentRecord(orderId: string): Promise<PaymentRecord | null>;
    getPaymentsByStatus(status: PaymentStatus): Promise<Array<PaymentRecord>>;
    getPaymentsCountByStatus(status: PaymentStatus): Promise<bigint>;
    getRecentPayments(limit: bigint): Promise<Array<PaymentRecord>>;
    getTotalPaymentsCount(): Promise<bigint>;
    paymentExists(orderId: string): Promise<boolean>;
    updatePaymentStatusWithTransactionId(adminPasswordInput: string, orderId: string, status: PaymentStatus, transactionId: string | null): Promise<void>;
}
