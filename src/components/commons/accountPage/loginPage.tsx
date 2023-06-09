import { Logo } from "../../../assets";

export const LoginPage = () => (
  <>
    <div className="login-page-ad-container d-flex align-items-center">
      <div className="login-page-ad-content-wrapper">
        <div className="login-page-logo d-flex align-items-center">
          <Logo />
          <span>QuickBite</span>
        </div>
        <p>Fresh and delicious, right to your door!</p>
      </div>
    </div>
    <div className="login-page-login-container"></div>
  </>
);
