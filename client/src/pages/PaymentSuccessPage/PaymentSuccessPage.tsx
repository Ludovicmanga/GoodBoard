import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"; // Assuming you are using React Router for navigation
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* import {
  faCheck,
  faClipboardList,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons"; */
import styles from "./PaymentSuccessPage.module.scss";
import { websiteUrl } from "../../helpers/constants";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(false);
  const generalPropertiesState = useAppSelector(state => state.generalProperties);

  const createPortalSession = async () => {
    if (process.env.NODE_ENV === "production") {
      if (session_id) {
        const response = await axios({
          method: "post",
          url: `${websiteUrl}/api/board/create-portal-session`,
          withCredentials: true,
          data: { session_id },
        });
        if (response.data) {
          window.open(response.data);
        }
      }
    } else {
      window.open("https://billing.stripe.com/p/login/test_9AQcN1aisefH8x27ss");
    }
  };

  const updateDB = async () => {
    if (session_id && generalPropertiesState.activeBoard) {
      const response = await axios({
        method: "post",
        url: `${websiteUrl}/api/board/update-board-billing-plan`,
        withCredentials: true,
        data: { session_id, boardId: generalPropertiesState.activeBoard },
      });
      if (response.data) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    updateDB();
  }, [session_id, generalPropertiesState.activeBoard]);

  return (
    <div className={styles.container}>
{/*       <FontAwesomeIcon icon={faCheck} className={styles.checkmark} />
      <h1 className={styles.heading}>Payment Successful!</h1>
      <p className={styles.message}>
        Thank you for your purchase. Your payment was successful.
      </p>
      <div className={styles.buttonsContainer}>
        <Link to={`/${websiteUrl}`} className={styles.button}>
          <FontAwesomeIcon
            icon={faClipboardList}
            className={styles.buttonIcon}
          />
          Go to My Goodboard
        </Link>
        <div className={styles.button} onClick={createPortalSession}>
          <FontAwesomeIcon icon={faCreditCard} className={styles.buttonIcon} />
          View My Stripe Details
        </div>
      </div> */}
    </div>
  );
};

export default PaymentSuccessPage;
