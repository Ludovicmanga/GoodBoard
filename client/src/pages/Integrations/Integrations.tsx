import React, { useEffect, useState } from "react";
import { ImTrello } from "react-icons/im";
import { SiGoogledrive, SiJira, SiNotion, SiSlack } from "react-icons/si";
import { FaSalesforce } from "react-icons/fa";
import IntegrationBox from "../../components/IntegrationBox/IntegrationBox";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import styles from "./Integrations.module.scss";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { SidebarNavBar } from "../../components/SidebarNavBar/SidebarNavBar";
import { ContentWithSidebar } from "../../components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

const handleClickTrelloIntegration = async () => {
  const res = await axios({
    url: `${websiteUrl}/api/integration/loginTrello`,
    method: "post",
    withCredentials: true,
  });
  if (res.data) {
    window.open(res.data);
  }
};

const integrations = [
  {
    name: "Trello",
    description: "Push suggestions to your Trello boards",
    connected: false,
    logo: "https://goodboard.s3.eu-central-1.amazonaws.com/58482beecef1014c0b5e4a36.png",
    developed: true,
    onclick: handleClickTrelloIntegration,
  },
  {
    name: "Jira software",
    description: "Push suggestions to your Jira boards",
    connected: false,
    logo: "https://goodboard.s3.eu-central-1.amazonaws.com/5968875.png",
    developed: false,
  },
  {
    name: "Slack",
    description: "Get notified when your features ar upvoted",
    connected: false,
    logo: "https://goodboard.s3.eu-central-1.amazonaws.com/5cb480cd5f1b6d3fbadece79.png",
    developed: false,
  },
  {
    name: "Salesforce",
    description: "Push suggestions to your Salesforce",
    connected: false,
    logo: "https://goodboard.s3.eu-central-1.amazonaws.com/logo-salesforce.png",
    developed: false,
  },
  {
    name: "Notion",
    description: "Push suggestions to your Notion boards",
    connected: false,
    logo: "https://goodboard.s3.eu-central-1.amazonaws.com/Notion_app_logo.png",
    developed: false,
  },
  {
    name: "Google Drive",
    description: "Push suggestions to your Google Drive",
    connected: false,
    logo: "https://goodboard.s3.eu-central-1.amazonaws.com/Google_Drive_logo.png",
    developed: false,
  },
];

const Integrations = (props: Props) => {
  const [integrationsList, setIntegrationsList] = useState(integrations);

  const checkAccessToTrello = async () => {
    const response = await axios({
      url: `${websiteUrl}/api/integration/check-trello-auth`,
      method: "POST",
      withCredentials: true,
    });
    if (response.data === true) {
      setIntegrationsList((currArray) =>
        currArray.map((a) => {
          if (a.name === "Trello") {
            a.connected = true;
          }
          return a;
        })
      );
    }
  };

  useEffect(() => {
    if (integrationsList.length > 0) {
      checkAccessToTrello();
    }
  }, [integrationsList]);
  return (
    <ContentWithSidebar>
      <div className={styles.container}>
        {integrationsList.map((integration) => (
          <div className={styles.integrationBoxContainer}>
            <IntegrationBox
              name={integration.name}
              description={integration.description}
              logo={integration.logo}
              connected={integration.connected}
              developed={integration.developed}
              onClick={integration.onclick}
            />
          </div>
        ))}
      </div>
    </ContentWithSidebar>
  );
};

export default Integrations;
