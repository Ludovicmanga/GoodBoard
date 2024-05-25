import { FaFire } from "react-icons/fa";
import { handleUpgradePlan } from "../../helpers/stripe";
import { BillingPlan } from "../../helpers/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import FeatureLine from "../FeatureLine/FeatureLine";
import styles from "./PricingBox.module.scss";
import { Button, Divider, Paper } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";

const PricingBox = (props: {
  plan: {
    name: BillingPlan;
    description: string;
    features: string[];
    price: number;
  };
  setSelectedPlan: React.Dispatch<React.SetStateAction<BillingPlan>>;
  setPageMode: React.Dispatch<
    React.SetStateAction<"settings" | "pricings list" | "checkout form">
  >;
}) => {
  return (
    <Paper elevation={3} className={styles.container}>
      {props.plan.name === BillingPlan.basic && (
        <div className={styles.popularityBadge}>
          <div className={styles.popularityIconContainer}>
            <FaFire />
          </div>

          <div className={styles.popularityTextContainer}>
            Le plus populaire
          </div>
        </div>
      )}

      <div className={styles.planNameContainer}>
        {capitalizeFirstLetter(props.plan.name)}
      </div>
      <div className={styles.planContextContainer}>
        {props.plan.description}
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.pricingSymbol}>€</div>
        <div className={styles.pricingAmount}>{props.plan.price}</div>
        <div className={styles.pricingContext}>HT / mois</div>
      </div>
      <div className={styles.submitBtnContainer}>
        <Button
          startIcon={<AutoAwesome />}
          onClick={() => {
            props.setSelectedPlan(props.plan.name);
            props.setPageMode("checkout form");
          }}
          variant="contained"
        >
          Choisir ce plan
        </Button>
      </div>
      <div className={styles.featuresSectionContainer}>
        {props.plan.features.map((feature) => (
          <div key={feature}>
            <div className={styles.featureLineContainer}>
              <FeatureLine text={feature} />
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default PricingBox;
