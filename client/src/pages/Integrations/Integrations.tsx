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
    logo: 'https://goodboard.s3.eu-central-1.amazonaws.com/58482beecef1014c0b5e4a36.png',
  },
  {
    name: "Jira software",
    description: "Push suggestions to your Jira boards",
    connected: false,
    logo: 'https://goodboard.s3.eu-central-1.amazonaws.com/5968875.png',
  },
  {
    name: "Slack",
    description: "Get notified when your features ar upvoted",
    connected: false,
    logo: 'https://goodboard.s3.eu-central-1.amazonaws.com/5cb480cd5f1b6d3fbadece79.png',
  },
  {
    name: "Salesforce",
    description: "Push suggestions to your Salesforce",
    connected: false,
    logo: 'https://goodboard.s3.eu-central-1.amazonaws.com/logo-salesforce.png',
  },
  {
    name: "Notion",
    description: "Push suggestions to your Notion boards",
    connected: true,
    logo: 'https://goodboard.s3.eu-central-1.amazonaws.com/Notion_app_logo.png'
  },
  {
    name: "Google Drive",
    description: "Push suggestions to your Google Drive",
    connected: true,
    logo:'https://goodboard.s3.eu-central-1.amazonaws.com/Google_Drive_logo.png',
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
