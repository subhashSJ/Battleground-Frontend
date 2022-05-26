import React, { useEffect, useState } from "react";
import {
  compareTargetAndOutput,
  convertCodeToImage,
  submitMultiPlayerBattle,
  submitFriendlyBattle,
  getMeBestScore,
  updateMyGame,
  createMyGame,
} from "../helper/EditorHelper";

const Editor = (props) => {
  const {
    target,
    setAccuracyPercentage,
    setError,
    battleID,
    battleType,
    gameID,
    setShow,
    setWinner,
    friendlyGameID,
    setCharactersUsed,
    setScore,
    setIsScoreUpdated,
    setIsScoreCreated,
    setIsCodeNotSaved,
    userName,
  } = props;

  const [html, setHtml] = useState(
    "<div></div>\n<style>\n body{\n    margin: 0;\n    width: 400px;\n    height: 300px;\n}\n div {\n    width: 100px;\n    height: 100px;\n    background: #dd6b4d;\n  }\n</style>\n\n<!-- OBJECTIVE -->\n<!-- Write HTML in this editor (below <style> tag) and replicate the given target image in the least code possible. What you write here, renders as it is -->\n<!-- IMPORTANT: remove the comments before submitting -->\n<!--Do not use tab for spacing-->"
  );

  const [hasCodeConvertedToImage, setHasCodeConvertedToImage] = useState("");

  const setAccuracy = (data) => {
    setAccuracyPercentage(data);
  };

  const setErrorMessage = (data) => {
    setError(data);
  };

  const handleShow = () => {
    setShow(true);
  };

  const setAWinner = (user) => {
    setWinner(user);
  };

  const setNumberOfCharactersUsed = (data) => {
    setCharactersUsed(data);
  };

  const setMyScore = (data) => {
    setScore(data);
  };

  const handleReset = () => {
    setAccuracy(0);
    setNumberOfCharactersUsed(0);
    setMyScore(0);
    setHtml(
      "<div></div>\n<style>\n body{\n    margin: 0;\n    width: 400px;\n    height: 300px;\n}\n div {\n    width: 100px;\n    height: 100px;\n    background: #dd6b4d;\n  }\n</style>\n\n<!-- OBJECTIVE -->\n<!-- Write HTML in this editor (below <style> tag) and replicate the given target image in the least code possible. What you write here, renders as it is -->\n<!-- IMPORTANT: remove the comments before submitting -->\n<!--Do not use tab for spacing-->"
    );
  };

  useEffect(() => {
    showPreview();
  }, [html]);

  const showPreview = () => {
    var htmlCode =
      "<body>" + document.getElementById("htmlCode").value + "</body>";
    var frame =
      document.getElementById("preview-window").contentWindow.document;
    frame.open();
    frame.write(htmlCode);
    frame.close();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleShow();
    setAccuracy(0);
    setNumberOfCharactersUsed(0);
    setMyScore(0);
    setIsScoreUpdated(false);
    setIsScoreCreated(false);
    setIsCodeNotSaved(false);

    const convertImage = await convertCodeToImage(html);

    setHasCodeConvertedToImage(convertImage.data.status);

    if (convertImage.data.status === "success") {
      const similarity = await compareTargetAndOutput(
        convertImage.data.url,
        target
      );

      var temp = 0;
      var accuracy = 0;

      if (similarity.data <= 50) {
        temp = (2 * (50 - similarity.data)) / 100;
        if (temp < 0.5) {
          accuracy = Math.pow(temp, 1.75).toPrecision(4);
        } else {
          accuracy = Math.pow(temp, 0.65).toPrecision(4);
        }
      } else {
        accuracy = 0.9;
      }

      if (similarity.data !== null) {
        setAccuracy((100 * accuracy).toPrecision(4));
        setNumberOfCharactersUsed(html.replace(/[^\w\s]/g, "").length);
        setMyScore(
          (
            ((1000 - html.replace(/[^\w\s]/g, "").length) * (100 * accuracy)) /
            1000
          ).toPrecision(4)
        );

        if (accuracy == 1) {
          var scoreOfTheGame =
            ((1000 - html.replace(/[^\w\s]/g, "").length) * (100 * accuracy)) /
            1000;

          if (battleType === "singlePlayer") {
            let flag = true;
            try {
              const bestScore = await getMeBestScore(userName, battleID);
              if (bestScore.data.status === "success") {
                try {
                  if (bestScore.data.score < scoreOfTheGame) {
                    const updateScore = await updateMyGame(
                      userName,
                      battleID,
                      scoreOfTheGame,
                      html
                    );
                    setIsScoreUpdated(true);
                    flag = false;
                  }
                } catch (error) {
                  console.log(error);
                }
              } else {
                try {
                  const createScore = await createMyGame(
                    userName,
                    battleID,
                    scoreOfTheGame,
                    html
                  );
                  setIsScoreCreated(true);
                  flag = false;
                } catch (error) {
                  console.log(error);
                }
              }
            } catch (error) {
              console.log(error);
            }
            if (flag) {
              setIsCodeNotSaved(true);
            }
          } else if (battleType === "twoPlayer") {
            try {
              const friendlyWinner = await submitFriendlyBattle(
                friendlyGameID,
                userName
              );

              setAWinner(friendlyWinner.data.winner);
            } catch (error) {
              console.log(error);
            }
          } else {
            const multiPlayerWinner = await submitMultiPlayerBattle(
              gameID,
              userName
            );
            setWinner(multiPlayerWinner.data.user_name);
          }
        }
      } else {
        setAccuracy(0);
      }
    } else {
      setErrorMessage("SOMETHING WENT WRONG. PLEASE TRY AGAIN");
    }
  };

  return (
    <>
      <div className="editor-heading">
        <h4 className="mt-1 mb-0">EDITOR</h4>
      </div>
      <div className="code-area">
        <textarea
          id="htmlCode"
          placeholder="Type your HTML code here..."
          onChange={(e) => {
            setHtml(e.target.value);
          }}
          value={html}
        />
      </div>
      <div className="editor-footer mt-1 mb-1">
        <button className="btn bg-button text-white" onClick={onSubmit}>
          Submit
        </button>
        <button
          className="btn bg-button text-white mx-1"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Editor;
