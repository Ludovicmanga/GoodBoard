import axios from "axios";
import { BillingPlan, UserType } from "../../helpers/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { useAppSelector } from "../../redux/hooks";
import PricingBox from "../PricingBox/PricingBox";
import styles from "./PricingContainer.module.scss";
import { websiteUrl } from "../../helpers/constants";

export const PricingContainer = () => {
  const loggedUserState = useAppSelector((state) => state.loggedUser);
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  return (
    <div className={styles.container}>
      {Object.values(BillingPlan).map((plan) => (
        <div className={styles.pricingBoxContainer} key={plan}>
          <PricingBox
            name={plan === BillingPlan.free ? "Gratuit" : plan}
            features={["ajout d'admins", "invitation de membres", "roadmap"]}
            contextDescription="Pour ceux qui démarrent, qui ont la dalle"
            amount={25}
            plan={plan}
          />
        </div>
      ))}
      {/* {loggedUserState.user?.roleOnThisBoard === UserType.admin && ()} */}
    </div>
  );
};

{
  /* <Button
                    key={plan}
                    onClick={() => handleUpgradePlan(plan)}
                    variant={
                      activeBoardState.billingPlan === plan ? "contained" : "outlined"
                    }
                  >
                    {capitalizeFirstLetter(plan)}
                  </Button> */
}
