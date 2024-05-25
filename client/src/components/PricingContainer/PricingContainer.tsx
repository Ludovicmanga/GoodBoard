import { BillingPlan, UserType } from "../../helpers/types";
import { useAppSelector } from "../../redux/hooks";
import PricingBox from "../PricingBox/PricingBox";
import styles from "./PricingContainer.module.scss";

export const PricingContainer = (props: {
  setSelectedPlan: React.Dispatch<React.SetStateAction<BillingPlan>>;
  setPageMode: React.Dispatch<
    React.SetStateAction<"settings" | "pricings list" | "checkout form">
  >;
}) => {
  const freePricingPlan = {
    name: BillingPlan.free,
    description: "Pour ceux qui démarrent, avec un faible volume",
    features: ["Jusqu'à 15 idées par board", "Système de votes"],
    price: 0,
  };

  const basicPricingPlan = {
    name: BillingPlan.basic,
    description: "Pour les pros, qui ont un volume relativement important",
    features: [
      "Idées illimitées sur chaque board",
      "Système de votes",
      "Système de catégories",
      "Filtrer et rechercher les idées",
    ],
    price: 10,
  };

  const businessPricingPlan = {
    name: BillingPlan.business,
    description: "Pour les entreprises, avec des besoins plus évolués",
    features: [
      "Idées illimitées sur chaque board",
      "Système de votes",
      "Système de catégories",
      "Filtrer et rechercher les idées",
      "Roadmap",
      "Changelog",
      "Intégrations",
    ],
    price: 25,
  };

  const allPlans = [freePricingPlan, basicPricingPlan, businessPricingPlan];

  return (
    <div className={styles.container}>
      {allPlans.map((plan) => (
        <div className={styles.pricingBoxContainer}>
          <PricingBox
            key={plan.name}
            plan={plan}
            setSelectedPlan={props.setSelectedPlan}
            setPageMode={props.setPageMode}
          />
        </div>
      ))}
    </div>
  );
};
