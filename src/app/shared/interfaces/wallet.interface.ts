
export interface WalletI {
    _id?: string
    alias: string
    sigla: string
    detalle: string
    dir: string
    tipo: number
    costo: number
    estado: boolean
    tag: string
    url: string
    minimoRetiro: number
    maxretiroB: number
    maxretiroP: number
    maxretiroO: number
    maxretiroD: number
    minimoProfit: number
    maximoProfitB: number
    maximoProfitP: number
    maximoProfitO: number
    maximoProfitD: number,
    createdAt: string
    updatedAt: string
}