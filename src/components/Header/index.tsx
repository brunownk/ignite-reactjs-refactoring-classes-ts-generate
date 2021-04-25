import { FiPlusSquare } from 'react-icons/fi';
import { useFoods } from '../../hooks/useFoods';

import { Container } from './styles';
import Logo from '../../assets/logo.svg';

interface IProps {
  openModal: () => void;
}

function Header(props: IProps) {
  const { openModal } = props;
  
  return(
    <Container>
        <header>
          <img src={Logo} alt="GoRestaurant" />
          <nav>
            <div>
              <button
                type="button"
                onClick={openModal}
              >
                <div className="text">Novo Prato</div>
                <div className="icon">
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
          </nav>
        </header>
      </Container>
  )
}

export default Header;
