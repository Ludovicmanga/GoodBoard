import styles from "./AdminsListSection.module.scss";
import AdminInListBox from "../AdminInListBox/AdminInListBox";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";

type Props = {};

const AdminsListSection = (props: Props) => {
  const generalPropertiesState = useAppSelector(state => state.generalProperties);
  const activeBoardId = generalPropertiesState.activeBoard;
  const dispatch = useAppDispatch();
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

  const handleChangeUserRole = async (userEmail: string, newRole: string) => {
     const response = await axios({
      method: "put",
      url: `${websiteUrl}/api/board/update-user-role`,
      withCredentials: true,
      data: { boardId: activeBoardId, userEmail, role: newRole },
    });
    if (response.data) {
      setBoardAdminsList(currList => currList.map(adminInList => {
        if (adminInList.email === userEmail) {
          return { ...adminInList, role: newRole }
        } else {
          return adminInList;
        }
      }));
      dispatch(
        setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: `The role of ${userEmail} was successfully changed to ${newRole}`,
          },
        })
      )
    } 
  };

  const handleDeleteAdmin = async (userEmail: string) => {
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/delete-user`,
      withCredentials: true,
      data: { userEmail, boardId: activeBoardId },
    });
    if (response.data) {
      setBoardAdminsList(currArray => currArray.filter(boardUser => boardUser.email !== userEmail));
      dispatch(
        setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: `The access of ${userEmail} was deleted from this board`,
          },
        })
      )
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className={styles.container}>
      {boardAdminsList.length > 0 ? boardAdminsList.map((boardAdmin) => (
        <AdminInListBox
          handleChangeUserRole={handleChangeUserRole}
          handleDeleteAdmin={handleDeleteAdmin}
          boardAdmin={boardAdmin}
        />
      )) : (<div className={styles.onlyAdminText}>You are the only admin on this board</div>)}
    </div>
  );
};

export default AdminsListSection;
