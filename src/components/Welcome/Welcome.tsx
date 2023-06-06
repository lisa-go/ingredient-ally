import './welcome.scss';
import logo from '../../assets/logo.png';

export default function Welcome() {
  return (
    <div id='welcome-container'>
      <div id='welcome-header-container'>
        <img
          src={logo}
          alt='logo'
        />
        <p>
          Welcome to <span>ingredient ally</span>!
        </p>
      </div>
      <div id='welcome-content-container'>
        <p>
          Our website analyzes the ingredients of your skincare products to
          determine which combinations may not work well together. Say goodbye
          to skincare mishaps and embrace a personalized routine that harmonizes
          with your skin's needs. Simplify your skincare journey and unlock the
          secrets to radiant, balanced skin with us.
        </p>
      </div>
    </div>
  );
}
