import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import FeatureRequests from "../pages/FeatureRequests/FeatureRequests";
import styles from "./index.module.scss";
import Roadmap from "../pages/Roadmap/Roadmap";
import { AuthPageType, BillingPlan, UserType } from "../helpers/types";
import Login from "../components/Login/Login";
import { useAppSelector } from "../redux/hooks";
import BoardCreation from "../pages/BoardCreation/BoardCreation";
import Integrations from "../pages/Integrations/Integrations";
import ViewBoard from "../pages/ViewBoard/ViewBoard";
import PaymentSuccessPage from "../pages/PaymentSuccessPage/PaymentSuccessPage";
import ChangeLog from "../pages/ChangeLog/ChangeLog";

export default function Index() {
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const activeBoard = useAppSelector(
    (state) => state.generalProperties
  ).activeBoard;
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          {loggedUser.user && (
            <Route path="/choose-board" element={<BoardCreation pageMode='page' />} />
          )}
          {loggedUser.user && !activeBoard && (
            <Route path="*" element={<Navigate to="/choose-board" replace />} />
          )}
          {activeBoard && (
            <>
              {/* <Route
                path="/company-feature-requests"
                element={<FeatureRequests type={UserType.admin} />}
              />
              <Route
                path="/user-feature-requests"
                element={<FeatureRequests type={UserType.externalUser} />}
              /> */}
              <Route
                path="/ideas"
                element={<FeatureRequests />}
              />
              <Route
                path="*"
                element={<Navigate to="/ideas" replace />}
              />
            </>
          )}
          {loggedUser && activeBoardState.billingPlan === BillingPlan.business && (
            <>
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/changeLog" element={<ChangeLog />} />
              <Route path="/integrations" element={<Integrations />} />
            </>
          )}
          <Route path="/view-board/:boardId" element={<ViewBoard />} />
          <Route
            path="/successful-stripe-payment"
            element={<PaymentSuccessPage />}
          />
          <Route
            path="/sign-up"
            element={<Login authType={AuthPageType.signUp} />}
          />
          <Route
            path="/login"
            element={<Login authType={AuthPageType.login} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
