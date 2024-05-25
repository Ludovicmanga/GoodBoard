import { handleUpgradePlan } from "../../helpers/stripe";
import { BillingPlan } from "../../helpers/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import FeatureLine from "../FeatureLine/FeatureLine";
import styles from "./PricingBox.module.scss";
import { Button, Divider, Paper } from "@mui/material";
import { RiVipCrownLine } from "react-icons/ri";

const PricingBox = (props: {
  features: string[];
  contextDescription: string;
  name: string;
  amount: number;
  plan: BillingPlan;
}) => {
  return (
    <Paper elevation={3} className={styles.container}>
      {props.plan === BillingPlan.basic && (
        <div className={styles.popularityBadge}>
          <div className={styles.popularityIconContainer}>
            <RiVipCrownLine />
          </div>

          <div className={styles.popularityTextContainer}>
            Le plus populaire
          </div>
        </div>
      )}

      <div className={styles.planNameContainer}>
        {capitalizeFirstLetter(props.name)}
      </div>
      <div className={styles.planContextContainer}>
        {props.contextDescription}
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.pricingSymbol}>€</div>
        <div className={styles.pricingAmount}>{props.amount}</div>
      </div>
      <div className={styles.featuresSectionContainer}>
        {props.features.map((feature) => (
          <div key={feature}>
            <div className={styles.featureLineContainer}>
              <FeatureLine text={feature} />
            </div>
            <Divider />
          </div>
        ))}
      </div>
      <div className={styles.submitBtnContainer}>
        <Button
          onClick={() => handleUpgradePlan(props.plan)}
          variant="contained"
        >
          Choisir ce plan
        </Button>
      </div>
    </Paper>
  );
};

export default PricingBox;
