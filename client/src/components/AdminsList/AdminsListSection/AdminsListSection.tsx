import styles from "./AdminsListSection.module.scss";
import AdminInListBox from "../AdminInListBox/AdminInListBox";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";

type Props = {};

const AdminsListSection = (props: Props) => {
  const generalPropertiesState = useAppSelector(state => state.generalProperties);
  const activeBoardId = generalPropertiesState.activeBoard;
  const [boardAdminsList, setBoardAdminsList] = useState<
    {
      email: string;
      role: string;
    }[]
  >([]);

  const getUsersList = async () => {
    const response = await axios({
      method: "get",
      url: `${websiteUrl}/api/board/get-board-users-list/${activeBoardId}`,
      withCredentials: true,
    });
    if (response.data) {
      setBoardAdminsList(response.data);
    }
  };

  const handleChangeUserRole = async (userEmail: string, role: string) => {
    const response = await axios({
      method: "put",
      url: `${websiteUrl}/api/board/update-user-role`,
      withCredentials: true,
      data: { boardId: activeBoardId, userEmail, role },
    });
    if (response.data) {
      setBoardAdminsList(response.data);
    }
  };

  const handleDeleteAdmin = async (userEmail: string) => {
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/delete-user`,
      withCredentials: true,
      data: { userEmail, boardId: activeBoardId, },
    });
    if (response.data) {
      setBoardAdminsList(response.data);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className={styles.container}>
      {boardAdminsList.map((boardAdmin) => (
        <AdminInListBox
          handleChangeUserRole={handleChangeUserRole}
          handleDeleteAdmin={handleDeleteAdmin}
          boardAdmin={boardAdmin}
        />
      ))}
    </div>
  );
};

export default AdminsListSection;
