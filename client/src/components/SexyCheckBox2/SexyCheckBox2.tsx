import { FilterType } from "../../helpers/types";
import styles from "./SexyCheckBox2.module.scss";

export const SexyCheckBox2 = (props: {
  id: number;
  onClick: (isChecked: boolean) => void;
  activeFiltersList: FilterType[];
}) => {
  const filterIsActive = props.activeFiltersList
    .map((list) => list.id)
    .includes(props.id);

  return (
    <div className={styles.checkBoxWrapper43}>
      <input
        type="checkbox"
        id={`${props.id}`}
        onChange={(e) => props.onClick(e.target.checked)}
        capture
        checked={filterIsActive}
      />
      <label htmlFor={`${props.id}`} className={styles.check}>
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
  );
};
