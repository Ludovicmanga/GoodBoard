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
import Integrations from "../pages/Integrations/Integrations";
import ViewBoard from "../pages/ViewBoard/ViewBoard";
import ChangeLog from "../pages/ChangeLog/ChangeLog";
import { useEffect } from "react";
import CreationPage from "../pages/CreationPage/CreationPage";
import ChooseBoardMenu from "../pages/ChooseBoard/ChooseBoard";
import { ReturnStripePage } from "../pages/ReturnStripePage/ReturnStripePage";

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
          {loggedUser.user === null && !activeBoard && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          {loggedUser.user && (
            <>
              <Route
                path="/choose-board"
                element={<ChooseBoardMenu pageMode="page" />}
              />
              <Route path="/create-board" element={<CreationPage />} />
              <Route path="/return" element={<ReturnStripePage />} />
            </>
          )}
          {loggedUser.user && !activeBoard && (
            <Route path="*" element={<Navigate to="/choose-board" replace />} />
          )}
          {activeBoard && (
            <>
              <Route path="/ideas" element={<FeatureRequests />} />
              <Route path="*" element={<Navigate to="/ideas" replace />} />
            </>
          )}
          {loggedUser &&
            activeBoardState.billingPlan === BillingPlan.business && (
              <>
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/changeLog" element={<ChangeLog />} />
                <Route path="/integrations" element={<Integrations />} />
              </>
            )}
          <Route path="/view-board/:boardId" element={<ViewBoard />} />
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
