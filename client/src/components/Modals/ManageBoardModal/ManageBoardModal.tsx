import { IconButton, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ManageBoardModal.module.scss";
import ChooseBoardColor from "../../ChooseBoardColor/ChooseBoardColor";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { BillingPlan } from "../../../helpers/types";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { setActiveBoardData } from "../../../redux/features/activeBoardSlice";
import { PricingContainer } from "../../PricingContainer/PricingContainer";
import { capitalizeFirstLetter } from "../../../helpers/utils";
import { EditableInput } from "../../EditableInput/EditableInput";
import { EditablePicture } from "../../EditablePicture/EditablePicture";
import {
  deleteBoardImageApiCall,
  handleUploadImageToBoard,
  updateInstagramUrlApiCall,
} from "../../../helpers/boards";
import { ArrowBack } from "@mui/icons-material";
import { BtnWithCrown } from "../../ShiningBtn/BtnWithCrown";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { handleUpgradePlan } from "../../../helpers/stripe";

const stripePromise = loadStripe("pk_test_z5x89OfwkEg8eXOJNMx384xK00KNJoz6oP");

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ManageBoardModal = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const [boardNameInputClicked, setBoardNameInputClicked] = useState(false);
  const [boardDescriptionInputClicked, setBoardDescriptionInputClicked] =
    useState(false);
  const [websiteUrlInputClicked, setWebsiteUrlInputClicked] = useState(false);
  const [instagramUrlInputClicked, setInstagramUrlInputClicked] =
    useState(false);
  const [facebookUrlInputClicked, setFacebookUrlInputClicked] = useState(false);
  const [twitterUrlInputClicked, setTwitterUrlInputClicked] = useState(false);
  const [pageMode, setPageMode] = useState<
    "settings" | "pricings list" | "checkout form"
  >(generalPropertiesState?.manageBoardModalOpen?.initialStep || "settings");
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan>(
    BillingPlan.basic
  );
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const bigScreen = useMediaQuery("(min-width:40rem)");

  const handleUpdateBoardImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await handleUploadImageToBoard(
        selectedFile,
        dispatch,
        activeBoardState._id
      );
    }
  };

  const handleDeleteBoardImage = async () => {
    const res = await deleteBoardImageApiCall(activeBoardState._id);
    if (res.data) {
      dispatch(
        setActiveBoardData({
          picture: undefined,
        })
      );
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    setBoardNameInputClicked(false);
    setBoardDescriptionInputClicked(false);
    setPageMode("settings");
  }, [props.modalIsOpen]);

  useEffect(() => {
    if (generalPropertiesState?.manageBoardModalOpen?.initialStep) {
      setPageMode(generalPropertiesState?.manageBoardModalOpen?.initialStep);
    }
  }, [generalPropertiesState?.manageBoardModalOpen?.initialStep]);

  const handleUpdateInstagram = async (value: string) => {
    const response = await updateInstagramUrlApiCall(
      value,
      activeBoardState._id
    );
    if (response?.instagramUrl) {
      dispatch(
        setActiveBoardData({
          instagramUrl: response.instagramUrl,
        })
      );
    }
  };

  const handleUpdateTwitter = async () => {};

  return (
    <ModalTemplate
      modalIsOpen={props.modalIsOpen}
      handleClose={props.handleClose}
      height="95%"
      width={bigScreen ? "70%" : "95%"}
    >
      {pageMode === "checkout form" ? (
        <>
          <IconButton
            onClick={() => setPageMode("pricings list")}
            className={styles.arrowBackBtn}
          >
            <ArrowBack />
          </IconButton>
          <CheckoutForm selectedPlan={selectedPlan} />
        </>
      ) : pageMode === "pricings list" ? (
        <>
          <IconButton
            onClick={() => setPageMode("settings")}
            className={styles.arrowBackBtn}
          >
            <ArrowBack />
          </IconButton>
          <div>
            <PricingContainer
              setSelectedPlan={setSelectedPlan}
              setPageMode={setPageMode}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Souscription actuelle</h2>
          <div className={styles.pricingSection}>
            <div className={styles.pricingText}>
              Votre souscription actuelle est le plan{" "}
              <span className={styles.currentPlan}>
                {activeBoardState.billingPlan === BillingPlan.free
                  ? "Gratuit"
                  : activeBoardState.billingPlan
                  ? capitalizeFirstLetter(activeBoardState.billingPlan)
                  : ""}
              </span>
            </div>
            <div className={styles.subscribeBtnContainer}>
              <BtnWithCrown
                onClick={() => {
                  setPageMode("pricings list");
                }}
                text="Changer mon plan"
              />
            </div>
          </div>
          <EditableInput
            name="Nom"
            placeholder="Ex: Tesla"
            initialInputValue={activeBoardState.name}
            inputIsClicked={boardNameInputClicked}
            setInputIsClicked={setBoardNameInputClicked}
            maxLength={30}
            onSubmit={handleUpdateInstagram}
          />
          <EditableInput
            name="Description"
            placeholder="Ex: Tesla est une entreprise dans l'automobile"
            initialInputValue={activeBoardState.description}
            inputIsClicked={boardDescriptionInputClicked}
            setInputIsClicked={setBoardDescriptionInputClicked}
            maxLength={130}
            onSubmit={handleUpdateInstagram}
          />
          <EditablePicture
            src={activeBoardState.picture}
            name="Logo du board"
            handleUpdate={handleUpdateBoardImage}
            handleDelete={handleDeleteBoardImage}
            tooltipMessage="Taille conseillée : 300px sur 300px"
          />
          <EditableInput
            name="Site internet"
            placeholder="Ex: https://www.tesla.com"
            initialInputValue={activeBoardState.websiteUrl}
            inputIsClicked={websiteUrlInputClicked}
            setInputIsClicked={setWebsiteUrlInputClicked}
            onSubmit={handleUpdateInstagram}
          />
          <EditableInput
            name="Facebook"
            placeholder="Ex: elon"
            initialInputValue={activeBoardState.facebookUrl!}
            inputIsClicked={facebookUrlInputClicked}
            setInputIsClicked={setFacebookUrlInputClicked}
            onSubmit={handleUpdateInstagram}
          />
          <EditableInput
            name="Instagram"
            placeholder="Ex: elonmusk"
            initialInputValue={activeBoardState.instagramUrl!}
            inputIsClicked={instagramUrlInputClicked}
            setInputIsClicked={setInstagramUrlInputClicked}
            onSubmit={handleUpdateInstagram}
          />
          <EditableInput
            name="Twitter"
            placeholder="Ex: elonmusk"
            initialInputValue={activeBoardState.twitterUrl!}
            inputIsClicked={twitterUrlInputClicked}
            setInputIsClicked={setTwitterUrlInputClicked}
            onSubmit={handleUpdateInstagram}
          />
          <h2 className={styles.sectionTitle}>Couleur du board</h2>
          <div className={styles.ChooseBoardColorContainer}>
            <ChooseBoardColor mode="update" />
          </div>
        </>
      )}
    </ModalTemplate>
  );
};

export default ManageBoardModal;

const CheckoutForm = (props: { selectedPlan: BillingPlan }) => {
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const fetchClientSecret = useCallback(() => {
    return handleUpgradePlan(props.selectedPlan, activeBoardState._id).then(
      (res) => res.clientSecret
    );
  }, [activeBoardState._id]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
