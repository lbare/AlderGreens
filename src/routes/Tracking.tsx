import ScoreBG from "../assets/ScoreBG.png";
import CircularButton from "../components/CircularButton";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ScoreContext } from "../contexts/ScoreContext";
import "../App.css";
import { Hole } from "../contexts/ScoreContext";
import * as d3 from "d3";
import Hole1 from "../assets/holes/1.png";
import Hole2 from "../assets/holes/2.png";
import Hole3 from "../assets/holes/3.png";
import Hole4 from "../assets/holes/4.png";
import Hole5 from "../assets/holes/5.png";
import Hole6 from "../assets/holes/6.png";
import Hole7 from "../assets/holes/7.png";
import Hole8 from "../assets/holes/8.png";
import Hole9 from "../assets/holes/9.png";

const Tracking = () => {
  const holeImages = [
    Hole1,
    Hole2,
    Hole3,
    Hole4,
    Hole5,
    Hole6,
    Hole7,
    Hole8,
    Hole9,
  ];
  const { players, setPlayers } = useContext(ScoreContext);
  const svgRef = useRef(null);
  const [currentHole, setCurrentHole] = useState<number>(
    Number(localStorage.getItem("currentHole")) || 0
  );

  const getCurrentHoleData = (): Hole => {
    return (
      players[0]?.holes[currentHole] || {
        score: 0,
        shotHistory: [{ x: "50.5%", y: "90.8%" }],
      }
    );
  };

  const setCurrentHoleData = (data: Hole) => {
    const updatedPlayers = [...players];
    updatedPlayers[0].holes[currentHole] = data;
    setPlayers(updatedPlayers);
  };

  useEffect(() => {
    const holeData = getCurrentHoleData();
      localStorage.setItem("currentHole", currentHole.toString());

    if (holeData && holeData.putts) {
      // If data already exists for the hole, just return
      return;
    }

    setCurrentHoleData({
      ...holeData,
      putts: 0,
      score: 0,
      shotHistory: [
        {
          x: "50.5%",
          y: "90.8%",
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHole]);

  const currentHoleData = getCurrentHoleData();

  useEffect(() => {
    if (
      !currentHoleData ||
      !currentHoleData.shotHistory ||
      currentHoleData.shotHistory.length < 1
    )
      return;

    const svg = d3.select(svgRef.current);
    if (!svg.node()) return; // check if the node exists to make TypeScript happy

    svg.selectAll("*").remove(); // clear previous lines and balls

    const node = svg.node() as unknown as SVGSVGElement;
    if (!node) return; // Guard clause
    const svgWidth = node.getBoundingClientRect().width;
    const svgHeight = node.getBoundingClientRect().height;

    const lineGenerator = d3
      .line<{ x: string; y: string }>()
      .x((d: { x: string }) => (parseFloat(d.x) / 100) * svgWidth)
      .y((d: { y: string }) => (parseFloat(d.y) / 100) * svgHeight);

    svg
      .append("path")
      .attr("d", lineGenerator(currentHoleData.shotHistory) as never) // cast to any due to d3 type nuances
      .attr("stroke", "#131617")
      .attr("fill", "none")
      .attr("stroke-width", 6);

    svg
      .selectAll("circle")
      .data(currentHoleData.shotHistory)
      .enter()
      .append("circle")
      .attr("cx", (d: { x: string }) => (parseFloat(d.x) / 100) * svgWidth)
      .attr("cy", (d: { y: string }) => (parseFloat(d.y) / 100) * svgHeight)
      .attr(
        "r",
        (
          _d: { x: string; y: string; length?: string; angle?: number },
          i: number
        ) =>
          currentHoleData.shotHistory &&
          i !== currentHoleData.shotHistory.length - 1
            ? 7.5
            : 10
      ) // adjust radius based on the shot order
      .attr(
        "fill",
        (
          _d: { x: string; y: string; length?: string; angle?: number },
          i: number
        ) =>
          currentHoleData.shotHistory &&
          i === currentHoleData.shotHistory.length - 1
            ? "white"
            : "#131617"
      );

    const defs = svg.append("defs");

    const filter = defs
      .append("filter")
      .attr("id", "dropshadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feFlood")
      .attr("flood-color", "#131617")
      .attr("result", "floodOutput");

    filter
      .append("feComposite")
      .attr("in", "floodOutput")
      .attr("in2", "SourceAlpha")
      .attr("operator", "in")
      .attr("result", "compositeOutput");

    filter
      .append("feOffset")
      .attr("dx", 1.5)
      .attr("dy", 1.5)
      .attr("result", "offsetOutput");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetOutput");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    svg
      .selectAll("text")
      .data(currentHoleData.shotHistory)
      .enter()
      .append("text")
      .attr("x", (d: { x: string }) => (parseFloat(d.x) / 100) * svgWidth)
      .attr("y", (d: { y: string }) => {
        const yPos = (parseFloat(d.y) / 100) * svgHeight;
        return yPos < 25 ? yPos + 35 : yPos - 15; // assuming 20 as a buffer value
      })
      .text(
        (
          _d: { x: string; y: string; length?: string; angle?: number },
          i: number
        ) => (i !== 0 ? i.toString() : "")
      )
      .attr("fill", "white")
      .attr("font-size", "24px")
      .attr("text-anchor", "middle")
      .attr("font-family", "Archivo")
      .attr("font-weight", "900")
      .attr("stroke", "#131617")
      .attr("stroke-width", "6px")
      .attr("paint-order", "stroke fill")
      .attr("filter", "url(#dropshadow)");
  }, [currentHoleData]);

  const incrementPutts = () => {
    const currentData = getCurrentHoleData();
    if (currentData.putts) {
      setCurrentHoleData({
        ...currentData,
        putts: currentData.putts + 1,
        score: currentData.score + 1,
      });
    } else {
      setCurrentHoleData({
        ...currentData,
        putts: 1,
        score: currentData.score + 1,
      });
    }
  };

  const decrementPutts = () => {
    const currentData = getCurrentHoleData();
    if (currentData.putts) {
      if (currentData.putts === 0) return;
      setCurrentHoleData({
        ...currentData,
        putts: currentData.putts - 1,
        score: currentData.score - 1,
      });
    }
  };

  const undoShot = () => {
    const currentData = getCurrentHoleData();
    if (currentData.shotHistory) {
      const newShotHistory = currentData.shotHistory.slice(0, -1);
      setCurrentHoleData({
        ...currentData,
        shotHistory: newShotHistory,
        score: currentData.score - 1,
      });
    }
  };

  const submitScore = () => {
    if (currentHole === 8) {
      alert("Game Over!");
      return;
    } else {
      setCurrentHole((prevHole) => prevHole + 1);
    }
  };

  const prevHole = () => {
    if (currentHole === 0) return;
    setCurrentHole((prevHole) => prevHole - 1);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log("X:", e.clientX - rect.left, "Y:", e.clientY - rect.top);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const currentData = getCurrentHoleData();

      if (!currentData) return; // Ensure currentData is not undefined

      const updatedShotHistory = currentData.shotHistory
        ? [...currentData.shotHistory, { x: xPercent + "%", y: yPercent + "%" }]
        : [{ x: xPercent + "%", y: yPercent + "%" }];

      setCurrentHoleData({
        ...currentData,
        shotHistory: updatedShotHistory,
        score: currentData.score + 1,
      });
    }
  };

  return (
    <div
      className="flex h-full w-full justify-center items-center flex-col"
      style={{
        backgroundImage: `url(${ScoreBG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full mt-2 justify-evenly absolute top-0">
        <div className="flex flex-col mt-3 items-center" onClick={prevHole}>
          <div className="flex items-center justify-center relative">
            <h1
              className="font-bold italic font-archivo absolute z-10"
              style={{
                color: "white",
              }}
            >
              HOLE
            </h1>
            <h1
              className="font-bold italic font-archivo absolute"
              style={{
                color: "#2d603a",
                WebkitTextStroke: "5px #2d603a",
                textShadow: "1.5px 1.5px 0px #2d603a",
              }}
            >
              HOLE
            </h1>
          </div>
          <div
            className="mt-3 py-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              #{currentHole + 1}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center mt-3">
          <div className="flex items-center justify-center relative">
            <h1
              className="font-bold italic font-archivo absolute z-10"
              style={{
                color: "white",
              }}
            >
              SCORE
            </h1>
            <h1
              className="font-bold italic font-archivo absolute"
              style={{
                color: "#2d603a",
                WebkitTextStroke: "5px #2d603a",
                textShadow: "1.5px 1.5px 0px #2d603a",
              }}
            >
              SCORE
            </h1>
          </div>
          <div
            className="px-4 mt-3 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-8xl">
              {players[0]?.holes[currentHole]?.score ||
              players[0]?.holes[currentHole]?.score === 0
                ? players[0]?.holes[currentHole]?.score
                : "-"}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex mt-3 items-center justify-center relative">
            <h1
              className="font-bold italic font-archivo absolute z-10"
              style={{
                color: "white",
              }}
            >
              TOTAL
            </h1>
            <h1
              className="font-bold italic font-archivo absolute"
              style={{
                color: "#2d603a",
                WebkitTextStroke: "5px #2d603a",
                textShadow: "1.5px 1.5px 0px #2d603a",
              }}
            >
              TOTAL
            </h1>
          </div>
          <div
            className="py-2 mt-3 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              {players[0]?.holes
                .slice(0, currentHole + 1)
                .reduce((acc, curr) => acc + curr.score, 0)}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="flex w-2/3 h-2/3 mt-10 justify-between items-center self-center"
        onClick={handleTap}
        style={{
          position: "relative",
          backgroundImage: `url(${holeImages[currentHole]})`,
          backgroundSize: "65%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
      >
        <svg
          ref={svgRef}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></svg>
      </div>
      <div className="flex flex-col h-1/3 gap-6 w-1/6 left-4 absolute">
        <CircularButton icon="plus" onClick={incrementPutts} />
        <div className="flex flex-col items-center mt-3">
          <div className="flex items-center justify-center relative">
            <h1
              className="font-bold italic font-archivo absolute z-10 mb-6"
              style={{
                color: "white",
              }}
            >
              PUTTS
            </h1>
            <h1
              className="font-bold italic font-archivo absolute mb-6"
              style={{
                color: "#2d603a",
                WebkitTextStroke: "5px #2d603a",
                textShadow: "1.5px 1.5px 0px #2d603a",
              }}
            >
              PUTTS
            </h1>
          </div>
          <div
            className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              {players[0]?.holes[currentHole]?.putts ||
              players[0]?.holes[currentHole]?.putts === 0
                ? players[0]?.holes[currentHole]?.putts
                : "-"}
            </h1>
          </div>
        </div>

        <CircularButton icon="minus" onClick={decrementPutts} />
      </div>
      <div className="grid grid-rows-2 grid-cols-1 h-48 items-center absolute right-4">
        {currentHoleData.shotHistory &&
        currentHoleData.shotHistory.length > 1 ? (
          <CircularButton icon="undo" onClick={undoShot} />
        ) : (
          <div className="h-16 w-16"></div>
        )}
        <CircularButton icon="check" onClick={submitScore} />
      </div>
    </div>
  );
};

export default Tracking;
