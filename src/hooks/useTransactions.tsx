import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface TransactionProps {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    createdAt: string;
}
//interface TransactionInput {
//    title: string;
//    type: string;
//    category: string;
//    amount: number;
//}

type TransactionInput = Omit<TransactionProps, 'id'| 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;//aceita qualquer coisa
}

interface TransactionsContextData {
    transactions: TransactionProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData );//criando um novo contexto

export function TransactionsProvider({ children } : TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<TransactionProps[]>([]);

    useEffect(()=> {
    
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))

    }, []);

        async function createTransaction(transactionInput: TransactionInput) {
    
            const response = await api.post('/transactions', {
                ...transactionInput,
                createdAt: new Date(),
            });
            const { transaction } = response.data;

            setTransactions([
                ...transactions,
                transaction,
            ]);

        }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            { children }
        </TransactionsContext.Provider>
    )

}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}