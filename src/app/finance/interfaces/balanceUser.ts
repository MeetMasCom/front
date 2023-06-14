export interface RechargeI {
    dir: string
    hash: string
    amount: number
    detail: string
    remark?: string
    walletId: string
    userId: string;
    status: number;
    statusDetail?: string;
    user?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
}

export interface ReviewRechargeI {
    id: string;
    remark: string;
    status: number;
}

export interface BalanceUserI {
    _id?: string;
    walletId: string;
    userId: string;
    balance: number;
    alias: string;
    sigla: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RecordsI {
    _id: string;
    walletId: string;
    userId: string;
    detail: string;
    typeTransaction: string;
    referValue: number;
    companyValue: number;
    value: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}
