import axios from "axios";
import { BillingPlan } from "./types";
import { websiteUrl } from "./constants";

export const handleUpgradePlan = async (selectedPlan: BillingPlan, boardId: string) => {
    const plansWithStripeIds = [
      {
        plan: BillingPlan.free,
        stripeId: "price_1NXO4uGNxxoYuOrQttYZHLsH",
      },
      {
        plan: BillingPlan.basic,
        stripeId: "price_1NXO5AGNxxoYuOrQnZyrUEJj",
      },
      {
        plan: BillingPlan.business,
        stripeId: "price_1NXOW0GNxxoYuOrQbGRywECf",
      },
    ];

    const foundPlanWithId = plansWithStripeIds.find(
      (planInList) => planInList.plan === selectedPlan
    );
    if (foundPlanWithId) {
      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${websiteUrl}/api/board/create-checkout-session`,
        data: { selectedPlan: foundPlanWithId, boardId },
      });
      if (response.data) {
        //window.open(response.data);
        return response.data
      }
    }
  };