import React, { FC, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useTypedDispatch();
  const { isAuth } = useAuth();

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch(
          setUser({
            email: userCredential.user.email!,
            id: userCredential.user.uid,
          })
        );
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[idx].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex((b) => b.boardId == activeBoardId) === idx,
            },
            {
              [boardItem]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) !==
                idx,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleLogout} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
