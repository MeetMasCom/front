export interface RechargeI {
    dir: string
    hash: string
    amount: number
    detail: string
    walletId: string
    userId: string;
    status: number;
    statusDetail?: string;
    user?: string;
    createdAt?: string;
    updatedAt?: string;
}