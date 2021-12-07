
import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;// estou falando é uma funçao e que o retorno é vazio
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
        <Container>
        <header>
            <Content>
            <img src={logoImg} alt="dt money" />
            <button type='button' onClick={onOpenNewTransactionModal}>Nova transação</button>

            </Content>
        </header>
        </Container>
    )
    
}