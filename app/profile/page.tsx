import { ModalType } from "@/enums";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import ModalButton from "../components/Modal/ModalComponents/ModalButton";
import styles from "../global.module.scss";
import { blurDataUrl } from "../helpers";

const Profile = async () => {
  const data = await getServerSession(authOptions);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col6}>
          <h1>Server Session</h1>
          <p className={styles.pSmall}>Email: {data?.user.email}</p>
          <p className={styles.pSmall}>Name: {data?.user.name || "No name"}</p>
        </div>
        <div className={styles.col6}>
          <Image
            src={`${data?.user.image}`}
            alt="desc"
            width={150}
            height={150}
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col6}>
          <ModalButton modalType={ModalType.UPDATE_USER_NAME}>
            Update user
          </ModalButton>
        </div>
        <div className={styles.col6}>
          <ModalButton modalType={ModalType.UPDATE_USER_PASSWORD}>
            Update password
          </ModalButton>
        </div>
      </div>
    </>
  );
};

export default Profile;
