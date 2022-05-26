import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import Output from "./Output";
import Target from "./Target";
import { getARandomBattle } from "../helper/EditorHelper";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import { isAuthenticated } from "../../auth/helper";

const Main = () => {
  const [battle, setBattle] = useState({});
  const [error, setError] = useState(false);
  const [accuracyPercentage, setAccuracyPercentage] = useState(0);
  const [charactersUsed, setCharactersUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [winner, setWinner] = useState("");
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);
  const [isScoreCreated, setIsScoreCreated] = useState(false);
  const [isCodeNotSaved, setIsCodeNotSaved] = useState(false);
  const [userName, setUserName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { languageName, battleType, gameID } = useParams();

  const location = useLocation();

  useEffect(() => {
    if (languageName === "random") {
      getARandomBattle()
        .then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setBattle(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
    if (battleType === "singlePlayer" && languageName === "css") {
      setBattle(location.state.battle);
    }
    if (battleType === "multiPlayer" && languageName === "css") {
      setBattle(location.state);
    }
    if (battleType === "twoPlayer" && languageName === "css") {
      setBattle(location.state);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      setUserName(isAuthenticated().user.user_name);
    }
  }, [userName]);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const errorMessage = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <>
      <div className="container-fluid ">
        {errorMessage()}
        <div className="row p-4">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 editor">
            <Editor
              target={battle.link}
              setAccuracyPercentage={setAccuracyPercentage}
              setCharactersUsed={setCharactersUsed}
              setScore={setScore}
              setIsScoreCreated={setIsScoreCreated}
              setIsScoreUpdated={setIsScoreUpdated}
              setIsCodeNotSaved={setIsCodeNotSaved}
              setError={setError}
              battleID={battle._id}
              battleType={battleType}
              gameID={gameID}
              setShow={setShow}
              setWinner={setWinner}
              friendlyGameID={battle.gameID}
              userName={userName}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 output preview-area">
            <Output
              accuracyPercentage={accuracyPercentage}
              score={score}
              charactersUsed={charactersUsed}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 output preview-area">
            <Target target={battle.link} colors={battle.colors} />
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
        <Modal.Body>
          {accuracyPercentage === 0 ? (
            <>
              <h4>MATCHING OUTPUT WITH TARGET...</h4>
              <Spinner />
            </>
          ) : (
            <>
              <h3>YOUR ACCURACY IS : {accuracyPercentage} %</h3>
              {accuracyPercentage == 100 && battleType === "singlePlayer" ? (
                <p className="lead fw-bold">
                  {(isScoreCreated &&
                    "CONGRATULATIONS! You completed this battle successfully") ||
                    (isScoreUpdated &&
                      "CONGRATULATIONS! You completed this battle successfully and did better than your previous best") ||
                    (isCodeNotSaved &&
                      "CONGRATULATIONS! You completed this battle successfully but you have a better score with us") ||
                    "Loading..."}
                </p>
              ) : accuracyPercentage == 100 &&
                (battleType === "multiPlayer" || battleType === "twoPlayer") ? (
                winner !== "" && winner === userName ? (
                  <p className="lead fw-bold">
                    CONGRATULATIONS, You won the battle
                  </p>
                ) : (
                  <p className="lead fw-bold">
                    {winner} Won the battle <br/>
                    BETTER LUCK NEXT TIME!
                  </p>
                )
              ) : battleType === "singlePlayer" ? (
                <p className="lead fw-bold">
                  Note : Your code will only be saved if the accuracy is 100%
                </p>
              ) : (
                (battleType === "multiPlayer" ||
                  battleType === "twoPlayer") && (
                  <p className="lead fw-bold">
                    NOTE : In order to win the battle, react 100%
                    accuracy and submit before your opponent. <br/>
                    ALL THE BEST
                  </p>
                )
              )}

              <div className="_modal">
                <button
                  className="btn bg-button text-white"
                  onClick={handleCancel}
                >
                  OKAY
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Main;
