import { Dispatch } from "redux";
import { BillingPlan, FeatureRequestModalMode, User } from "./types";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";

export const handleOpenNewFeatureRequestModal = (args: {
  activeBoardPlan: BillingPlan;
  numberOfFeatureRequests: number;
  loggedUser: User | null | undefined;
  dispatch: Dispatch;
  mode: FeatureRequestModalMode;
}) => {
  const userHasAccess =
    args.activeBoardPlan !== BillingPlan.free ||
    args.numberOfFeatureRequests < 15;
  if (userHasAccess) {
    if (args.loggedUser) {
      args.dispatch(
        setGeneralProperties({
          featureRequestModal: {
            isOpen: true,
            mode: args.mode,
          },
        })
      );
    } else {
      args.dispatch(
        setGeneralProperties({
          cannotMakeActionModalOpen: true,
        })
      );
    }
  } else {
    args.dispatch(
      setGeneralProperties({
        needToUpgradeModalOpen: true,
      })
    );
  }
};
