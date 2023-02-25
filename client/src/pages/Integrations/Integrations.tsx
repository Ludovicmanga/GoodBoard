import React from "react";
import { ImTrello } from "react-icons/im";
import { SiGoogledrive, SiJira, SiNotion, SiSlack } from "react-icons/si";
import { FaSalesforce } from 'react-icons/fa';
import IntegrationBox from "../../components/IntegrationBox/IntegrationBox";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import styles from "./Integrations.module.scss";

type Props = {};

const integrations = [
  {
    name: "Trello",
    description: "Push suggestions to your Trello boards",
    connected: true,
    logo: <ImTrello color="#0079bf" fontSize={50} />,
  },
  {
    name: "Jira software",
    description: "Push suggestions to your Jira boards",
    connected: false,
    logo: <SiJira color='#003366' fontSize={50} />,
  },
  {
    name: "Slack",
    description: "Get notified when your features ar upvoted",
    connected: false,
    logo: <SiSlack color='#36C5F0' fontSize={50} />,
  },
  {
    name: "Salesforce",
    description: "Push suggestions to your Salesforce",
    connected: false,
    logo: <FaSalesforce color='#1798c1' fontSize={50} />,
  },
  {
    name: "Notion",
    description: "Push suggestions to your Notion boards",
    connected: true,
    logo: <SiNotion fontSize={50} />,
  },
  {
    name: "Google Drive",
    description: "Push suggestions to your Google Drive",
    connected: true,
    logo: <SiGoogledrive color='#36C5F0' fontSize={50} />,
  },
];

const Integrations = (props: Props) => {
  return (
    <div className={styles.container}>
      <MainNavBar />
      <div className={styles.integrationsContainer}>
        {integrations.map((integration) => (
          <div className={styles.integrationBoxContainer}>
            <IntegrationBox
              name={integration.name}
              description={integration.description}
              logo={integration.logo}
              connected={integration.connected}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
