import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsContext } from "./components/TransactionsContext";
import { GlobalStyle } from "./styles/global";


Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionOpen] = useState(false);

  function handleOpenNewTransactionModal() {
      setIsNewTransactionOpen(true)
  }

  function handleCloseNewTransactionsModal() {
      setIsNewTransactionOpen(false)
  }
  return (
    <TransactionsContext.Provider value={[]}>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionsModal}/>
      <GlobalStyle/>
    
    </TransactionsContext.Provider>
  );
}