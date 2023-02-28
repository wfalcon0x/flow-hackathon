import { ColorRing } from "react-loader-spinner";

import styles from "./index.module.scss";

export default function Loader() {
  return (
    <div className={styles.loading}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass={styles.loader}
        colors={["#BF3DDB", "#BF3DDB", "#BF3DDB", "#BF3DDB", "#BF3DDB"]}
      />
    </div>
  );
}
