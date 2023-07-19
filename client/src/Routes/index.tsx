import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import FeatureRequests from "../pages/FeatureRequests/FeatureRequests";
import styles from "./index.module.scss";
import Roadmap from "../pages/Roadmap/Roadmap";
import { AuthPageType, UserType } from "../helpers/types";
import Login from "../components/Login/Login";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import BoardCreation from "../pages/BoardCreation/BoardCreation";
import Integrations from "../pages/Integrations/Integrations";
import ViewBoard from "../pages/ViewBoard/ViewBoard";
import CannotMakeActionAsGuestModal from "../components/Modals/CannotMakeActionAsGuestModal/CannotMakeActionAsGuestModal";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";

export default function Index() {
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const activeBoard = generalPropertiesState.activeBoard;
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route
            path="/sign-up"
            element={<Login authType={AuthPageType.signUp} />}
          />
          <Route
            path="/login"
            element={<Login authType={AuthPageType.login} />}
          />
          <Route path="/choose-board" element={<BoardCreation />} />
          <Route path="/view-board/:boardId" element={<ViewBoard />} />
          {/*        {loggedUser.user === null && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )} */}
          {loggedUser.user && !activeBoard && (
            <Route path="*" element={<Navigate to="/choose-board" replace />} />
          )}
          {loggedUser.user && activeBoard && (
            <>
              <Route
                path="*"
                element={<Navigate to="/user-feature-requests" replace />}
              />
              <Route path="/integrations" element={<Integrations />} />
            </>
          )}

          <>
            <Route
              path="/company-feature-requests"
              element={<FeatureRequests type={UserType.admin} />}
            />
            <Route
              path="/user-feature-requests"
              element={<FeatureRequests type={UserType.user} />}
            />

            <Route path="/roadmap" element={<Roadmap />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}
