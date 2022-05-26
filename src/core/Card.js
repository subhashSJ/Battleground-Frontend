import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  checkConnectionPool,
  createConnection,
  deleteConnection,
  findMutualGame,
  getBattle,
  getInviteCode,
  hasBattleStarted,
  startBattle,
  shouldIstartMutualGame,
  getFriendlyBattleData,
  hasFriendlyBattleStarted,
  deleteFriendlyBattle,
} from "./helper/CardHelper";
import Spinner from "./layout/Spinner";
import Countdown from "react-countdown";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "../auth/helper";

const Card = (props) => {
  const { language_name, language_description, language_logo } = props;

  const [multiplayerBattle, setMultiplayerBattle] = useState({});
  const [message, setMessage] = useState("");
  const [multiplayergameId, setMultiplayergameId] = useState("");
  const [connectionID, setConnectionID] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [friendlyBattle, setFriendlyBattle] = useState({});
  const [friendlyBattleMessage, setFriendlyBattleMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [friendlyBattleGameID, setFriendlyBattleGameID] = useState("");
  const [userName, setUserName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOff = () => setShowModal(false);
  const handleOn = () => setShowModal(true);

  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(isAuthenticated().user.user_name);
    }
  }, [userName]);

  const getMultiplayerBattle = async () => {
    handleShow();
    //Check connection pool
    const checkConnectId = await checkConnectionPool(userName, language_name);

    if (checkConnectId.data === null) {
      //Create connectionId if connection pool is empty
      const createConnectId = await createConnection(userName, language_name);
      setConnectionID(createConnectId.data._id);

      intervalRef.current = setInterval(async () => {
        const gameID = await hasBattleStarted(createConnectId.data._id);

        if (gameID && gameID.data !== null) {
          clearTimeout(myTimeout);
          clearInterval(intervalRef.current);
          clearTimeout(timeoutRef.current);
          setMultiplayergameId(gameID.data._id);

          const battle = await getBattle(gameID.data._id);
          setMultiplayerBattle(battle.data);
        }
      }, 2000);

      const myTimeout = setTimeout(
        () => clearInterval(intervalRef.current),
        30000
      );
    } else {
      setConnectionID(checkConnectId.data._id);

      const gameId = await startBattle(checkConnectId.data._id, userName);
      setMultiplayergameId(gameId.data._id);

      const battle = await getBattle(gameId.data._id);
      setMultiplayerBattle(battle.data);
    }

    timeoutRef.current = setTimeout(() => {
      setMessage("NO OPPONENT FOUND. PLEASE TRY AFTER SOME TIME");
    }, 40000);
  };

  const deleteMultiplayerConnection = () => {
    setMessage("");

    if (connectionID !== "") {
      deleteConnection(connectionID);
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;

    handleClose();
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return <span>{seconds}</span>;
  };

  const myIntervalRef = useRef(null);
  const myTimeoutRef = useRef(null);

  const getMeInviteBattle = async () => {
    try {
      const code = await getInviteCode(userName);
      setInviteCode(code.data.code);
      setFriendlyBattleGameID(code.data._id);

      myIntervalRef.current = setInterval(async () => {
        const friendData = await hasFriendlyBattleStarted(code.data._id);

        if (friendData && friendData.data !== null) {
          clearTimeout(myTimeout);
          clearInterval(myIntervalRef.current);
          clearTimeout(myTimeoutRef.current);

          try {
            const battleData = await getFriendlyBattleData(code.data._id);
            setFriendlyBattle(battleData.data);
          } catch (error) {
            console.log(error);
          }
        }
      }, 2000);

      const myTimeout = setTimeout(
        () => clearInterval(myIntervalRef.current),
        60000
      );
    } catch (error) {
      console.log(error);
    }

    myTimeoutRef.current = setTimeout(() => {
      setFriendlyBattleMessage(
        "CAN'T COONECT WITH YOUR FRINED. PLEASE TRY AFTER SOME TIME"
      );
    }, 65000);
  };

  const startFriendlyBattle = async () => {
    try {
      const mutualGame = await findMutualGame(joinCode);

      if (mutualGame.data === null) {
        toast.error("Invalid Invite Code", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (mutualGame && mutualGame.data._id !== null) {
        try {
          const flag = await shouldIstartMutualGame(
            mutualGame.data._id,
            userName
          );

          setFriendlyBattleGameID(mutualGame.data._id);

          if (flag && flag.data.status === "success") {
            try {
              const battleData = await getFriendlyBattleData(
                mutualGame.data._id
              );
              setFriendlyBattle(battleData.data);
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {}
  };

  const deletFriendlyConnection = () => {
    setInviteCode("");
    setJoinCode("");
    setFlag(false);
    setFriendlyBattleMessage("");
    if (friendlyBattleGameID !== "") {
      deleteFriendlyBattle(friendlyBattleGameID);
    }

    clearInterval(myIntervalRef.current);
    myIntervalRef.current = null;

    clearTimeout(myTimeoutRef.current);
    myTimeoutRef.current = null;

    handleOff();
  };

  return (
    <>
      <div className="card custom_card">
        <div className="row g-0">
          <div className="col-md-4 my-2 card_image">
            <img
              src={language_logo}
              className="img-fluid rounded-start card-img-top"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {language_name}{" "}
                {language_name === "JavaScript" && <small>(Coming Soon)</small>}
              </h5>
              <p className="card-text">{language_description}</p>
              <div className="button-group">
                <Link
                  to="/ParticularLanguage"
                  className={
                    language_name === "JavaScript"
                      ? "btn bg-button my-2 text-white disabled"
                      : "btn bg-button my-2 text-white"
                  }
                >
                  Single-player
                </Link>
                <button
                  disabled={language_name === "JavaScript"}
                  onClick={() => {
                    return isAuthenticated()
                      ? handleOn()
                      : toast.error("Please login to battle a friend", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                  }}
                  className="btn bg-button my-2 text-white"
                >
                  Friendly Battle
                </button>
                <button
                  type="button"
                  disabled={language_name === "JavaScript"}
                  className="btn bg-button my-2 text-white"
                  onClick={() => {
                    return isAuthenticated()
                      ? getMultiplayerBattle()
                      : toast.error("Please login to play multiplayer battle", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                  }}
                >
                  Multiplayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
        backdrop="static"
      >
        {JSON.stringify(multiplayerBattle) === "{}" && (
          <Modal.Header
            closeButton
            onClick={() => deleteMultiplayerConnection()}
          >
            <Modal.Title>Searching for an opponent...</Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body>
          {JSON.stringify(multiplayerBattle) === "{}" && message === "" ? (
            <>
              {" "}
              <Spinner />{" "}
              <div className="_modal">
                <button
                  className="btn bg-button text-white"
                  onClick={() => deleteMultiplayerConnection()}
                >
                  CANCEL
                </button>
              </div>
            </>
          ) : JSON.stringify(multiplayerBattle) === "{}" ? (
            <h4>{message}</h4>
          ) : (
            <>
              <div className="_modal">
                <h4>OPPONENT FOUND</h4>
                <div className="lead fw-bold">
                  {multiplayerBattle.user_one === userName
                    ? "You"
                    : multiplayerBattle.user_one}{" "}
                  VS{" "}
                  {multiplayerBattle.user_two === userName
                    ? "You"
                    : multiplayerBattle.user_two}
                </div>
                <p>
                  Your battle starts in{" "}
                  <Countdown
                    date={Date.now() + 5000}
                    renderer={renderer}
                    onComplete={() =>
                      navigate(`/css/multiPlayer/${multiplayergameId}`, {
                        state: multiplayerBattle,
                      })
                    }
                  ></Countdown>{" "}
                  secs...
                </p>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showModal}
        onHide={handleOff}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
        backdrop="static"
      >
        {JSON.stringify(friendlyBattle) === "{}" && (
          <Modal.Header closeButton onClick={() => deletFriendlyConnection()}>
            <Modal.Title>FRIENDLY BATTLE</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          {inviteCode === "" && flag === false ? (
            <div className="friendly_modal">
              <button
                className="btn bg-button text-white"
                onClick={getMeInviteBattle}
              >
                INVITE A FRIEND
              </button>
              <button
                className="btn bg-button text-white"
                onClick={() => setFlag(true)}
              >
                JOIN BATTLE
              </button>
            </div>
          ) : flag && JSON.stringify(friendlyBattle) === "{}" ? (
            <>
              <Form.Group>
                <Form.Control
                  required={true}
                  type="text"
                  onChange={(e) => setJoinCode(e.target.value)}
                  value={joinCode}
                  placeholder="ENTER THE INVITE CODE"
                />
                <div className="_modal">
                  <button
                    disabled={joinCode === ""}
                    className="btn bg-button text-white my-2 _modal"
                    onClick={() => startFriendlyBattle()}
                  >
                    START BATTLE
                  </button>
                </div>
              </Form.Group>
            </>
          ) : JSON.stringify(friendlyBattle) !== "{}" ? (
            <div className="_modal">
              <h5>
                Connected with{" "}
                {friendlyBattle.user_one === userName
                  ? friendlyBattle.user_two
                  : friendlyBattle.user_one}
              </h5>
              <p>
                Your battle starts in{" "}
                <Countdown
                  date={Date.now() + 5000}
                  renderer={renderer}
                  onComplete={() =>
                    navigate(`/css/twoPlayer/${friendlyBattle.gameID}`, {
                      state: friendlyBattle,
                    })
                  }
                ></Countdown>{" "}
                secs...
              </p>
            </div>
          ) : friendlyBattleMessage !== "" ? (
            <p className="lead">{friendlyBattleMessage}</p>
          ) : (
            <>
              <div className="modal_body">
                <p>
                  YOUR INVITE CODE IS :<strong> {inviteCode}</strong>
                </p>
                <p className="lead">
                  Note : Share above invite code with your friend and ask
                  him/her to start the battle
                </p>
              </div>
              <Spinner />
              <div className="_modal">
                <button
                  className="btn bg-button text-white"
                  onClick={() => deletFriendlyConnection()}
                >
                  CANCEL
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Card;
