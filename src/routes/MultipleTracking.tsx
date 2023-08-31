import ScoreBG from "../assets/ScoreBG.png";
import CircularButton from "../components/CircularButton";
import React, { useState, useRef, useEffect } from "react";
import "../App.css";
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

const MultipleTracking = () => {
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
  const [ball1Putts, setBall1Putts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [ball2Putts, setBall2Putts] = useState<number>(0);
  const [activeBall, setActiveBall] = useState<number>(0);
  const [ball1Score, setBall1Score] = useState<number>(0);
  const [ball2Score, setBall2Score] = useState<number>(0);
  const [ball1TotalScore, setBall1TotalScore] = useState<number>(0);
  const [ball2TotalScore, setBall2TotalScore] = useState<number>(0);
  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);
  const [ball1ShotHistory, setBall1ShotHistory] = useState<
    Array<{ x: string; y: string; length?: string; angle?: number }>
  >([{ x: "50.5%", y: "90.5%" }]);
  const [ball2ShotHistory, setBall2ShotHistory] = useState<
    Array<{ x: string; y: string; length?: string; angle?: number }>
  >([{ x: "50.5%", y: "90.5%" }]);
  const [currentHole, setCurrentHole] = useState<number>(0);
  const [ball1Holes, setBall1Holes] = useState<
    Array<{
      putts: number;
      score: number;
      shotHistory: Array<{
        x: string;
        y: string;
        length?: string;
        angle?: number;
      }>;
    }>
  >([]);
  const [ball2Holes, setBall2Holes] = useState<
    Array<{
      putts: number;
      score: number;
      shotHistory: Array<{
        x: string;
        y: string;
        length?: string;
        angle?: number;
      }>;
    }>
  >([]);

  useEffect(() => {
    if (!ball1Holes[currentHole]) {
      setBall1Holes((prev) => [
        ...prev,
        { putts: 0, score: 0, shotHistory: [{ x: "50.5%", y: "90.5%" }] },
      ]);
    }
    setBall1Putts(ball1Holes[currentHole]?.putts || 0);
    setBall1Score(ball1Holes[currentHole]?.score || 0);
    setBall1ShotHistory(ball1Holes[currentHole]?.shotHistory || []);
  }, [currentHole, ball1Holes]);

  useEffect(() => {
    if (!ball2Holes[currentHole]) {
      setBall2Holes((prev) => [
        ...prev,
        { putts: 0, score: 0, shotHistory: [{ x: "50.5%", y: "90.5%" }] },
      ]);
    }
    setBall2Putts(ball2Holes[currentHole]?.putts || 0);
    setBall2Score(ball2Holes[currentHole]?.score || 0);
    setBall2ShotHistory(ball2Holes[currentHole]?.shotHistory || []);
  }, [currentHole, ball2Holes]);

  useEffect(() => {
    const svg1 = d3.select(svgRef1.current);
    const svg2 = d3.select(svgRef2.current);
    if (activeBall === 0) {
      svg1.selectAll(".ball1").attr("visibility", "visible");
      svg2.selectAll(".ball2").attr("visibility", "hidden");
    } else {
      svg1.selectAll(".ball1").attr("visibility", "hidden");
      svg2.selectAll(".ball2").attr("visibility", "visible");
    }
  }, [activeBall]);

  useEffect(() => {
    if (ball1ShotHistory.length < 1) return;

    const svg = d3.select(svgRef1.current);
    if (!svg.node()) return; // check if the node exists to make TypeScript happy

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
      .attr("class", ".ball1")
      .attr("d", lineGenerator(ball1ShotHistory) as never) // cast to any due to d3 type nuances
      .attr("stroke", "#131415")
      .attr("fill", "none")
      .attr("stroke-width", 6);

    svg
      .selectAll("circle")
      .attr("class", ".ball1")
      .data(ball1ShotHistory)
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
          ball1ShotHistory.length === 1 || i !== ball1ShotHistory.length - 1
            ? 10
            : 15
      ) // adjust radius based on the shot order
      .attr(
        "fill",
        (
          _d: { x: string; y: string; length?: string; angle?: number },
          i: number
        ) => (i === ball1ShotHistory.length - 1 ? "#FFA825" : "#FFFFFF")
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
      .selectAll("text.ball2")
      .attr("class", ".ball1")
      .data(ball1ShotHistory)
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

    svg
      .selectAll("text.ball-number")
      .data(ball1ShotHistory)
      .enter()
      .append("text")
      .attr("class", "ball-number")
      .attr("x", (d: { x: string }) => (parseFloat(d.x) / 100) * svgWidth)
      .attr("y", (d: { y: string }) => (parseFloat(d.y) / 100) * svgHeight)
      .text((_d, i: number) => (i === ball1ShotHistory.length - 1 ? "1" : ""))
      .attr("fill", "black")
      .attr("font-size", "16px") // You can adjust this value
      .attr("font-family", "Archivo")
      .attr("font-weight", "800")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle");
  }, [ball1ShotHistory, activeBall]);

  useEffect(() => {
    if (ball2ShotHistory.length < 1) return;

    const svg = d3.select(svgRef2.current);
    if (!svg.node()) return; // check if the node exists to make TypeScript happy

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
      .attr("class", ".ball2")
      .attr("class", "ball2-line")
      .attr("d", lineGenerator(ball2ShotHistory) as never) // cast to any due to d3 type nuances
      .attr("stroke", "#131617")
      .attr("fill", "none")
      .attr("stroke-width", 6);

    svg
      .selectAll("circle")
      .attr("class", ".ball2")
      .data(ball2ShotHistory)
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
          ball2ShotHistory.length === 1 || i !== ball2ShotHistory.length - 1
            ? 10
            : 15
      ) // adjust radius based on the shot order
      .attr(
        "fill",
        (
          _d: { x: string; y: string; length?: string; angle?: number },
          i: number
        ) => (i === ball2ShotHistory.length - 1 ? "#37B9E9" : "#131617")
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
      .selectAll("text.ball2")
      .attr("class", ".ball2")
      .data(ball2ShotHistory)
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

    svg
      .selectAll("text.ball-number")
      .data(ball2ShotHistory)
      .enter()
      .append("text")
      .attr("class", "ball-number")
      .attr("x", (d: { x: string }) => (parseFloat(d.x) / 100) * svgWidth)
      .attr("y", (d: { y: string }) => (parseFloat(d.y) / 100) * svgHeight)
      .text((_d, i: number) => (i === ball2ShotHistory.length - 1 ? "2" : ""))
      .attr("fill", "black")
      .attr("font-size", "16px") // You can adjust this value
      .attr("font-family", "Archivo")
      .attr("font-weight", "800")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle");
  }, [ball2ShotHistory, activeBall]);

  const incrementPutts = () => {
    if (activeBall === 0) {
      setBall1Putts((prevPutts) => prevPutts + 1);
      setBall1Score((prevScore) => prevScore + 1);
      setBall1TotalScore((prevScore) => prevScore + 1);
    } else {
      setBall2Putts((prevPutts) => prevPutts + 1);
      setBall2Score((prevScore) => prevScore + 1);
      setBall2TotalScore((prevScore) => prevScore + 1);
    }
  };

  const decrementPutts = () => {
    if (activeBall === 0) {
      if (ball1Putts === 0) return;
      setBall1Putts((prevPutts) => prevPutts - 1);
      setBall1Score((prevScore) => prevScore - 1);
      setBall1TotalScore((prevScore) => prevScore - 1);
    } else {
      if (ball2Putts === 0) return;
      setBall2Putts((prevPutts) => prevPutts - 1);
      setBall2Score((prevScore) => prevScore - 1);
      setBall2TotalScore((prevScore) => prevScore - 1);
    }
  };

  const undoShot = () => {
    if (activeBall === 0) {
      setBall1ShotHistory((prevHistory) => prevHistory.slice(0, -1));
      setBall1Score((prevScore) => prevScore - 1);
      setBall1TotalScore((prevScore) => prevScore - 1);
    } else {
      setBall2ShotHistory((prevHistory) => prevHistory.slice(0, -1));
      setBall2Score((prevScore) => prevScore - 1);
      setBall2TotalScore((prevScore) => prevScore - 1);
    }
  };

  const submitScore = () => {
    if (currentHole === 8) {
      setGameOver(true);
      return;
    } else {
      const svg1 = d3.select(svgRef1.current);
      const svg2 = d3.select(svgRef2.current);
      svg1.selectAll(".ball1").remove();
      svg2.selectAll(".ball2").remove();
      saveCurrentHoleData();
      setCurrentHole((prevHole) => prevHole + 1);
    }
  };

  const prevHole = () => {
    if (currentHole === 0) return;
    saveCurrentHoleData();
    setCurrentHole((prevHole) => prevHole - 1);
  };

  const saveCurrentHoleData = () => {
    const ball1UpdatedHoles = [...ball1Holes];
    const ball2UpdatedHoles = [...ball2Holes];
    ball1UpdatedHoles[currentHole] = {
      putts: ball1Putts,
      score: ball1Score,
      shotHistory: ball1ShotHistory,
    };
    ball2UpdatedHoles[currentHole] = {
      putts: ball2Putts,
      score: ball2Score,
      shotHistory: ball2ShotHistory,
    };
    setBall1Holes(ball1UpdatedHoles);
    setBall2Holes(ball2UpdatedHoles);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log("X:", e.clientX - rect.left, "Y:", e.clientY - rect.top);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      if (activeBall === 0) {
        setBall1Score((prevScore) => prevScore + 1);
        setBall1TotalScore((prevScore) => prevScore + 1);
        setBall1ShotHistory((prevHistory) => [
          ...prevHistory,
          { x: xPercent + "%", y: yPercent + "%" },
        ]);
      } else {
        setBall2Score((prevScore) => prevScore + 1);
        setBall2TotalScore((prevScore) => prevScore + 1);
        setBall2ShotHistory((prevHistory) => [
          ...prevHistory,
          { x: xPercent + "%", y: yPercent + "%" },
        ]);
      }
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
        <div className="flex flex-col items-center" onClick={prevHole}>
          <h1 className="font-archivo font-semibold italic text-green-700 opacity-75">
            HOLE
          </h1>
          <div
            className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              #{currentHole + 1}
            </h1>
          </div>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => {
            setActiveBall((prev) => (prev === 0 ? 1 : 0));
          }}
        >
          <h1 className="font-archivo font-semibold italic text-green-700 opacity-75">
            BALL #{activeBall + 1} SCORE
          </h1>
          <div
            className="px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-8xl">
              {activeBall === 0 ? ball1Score : ball2Score}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-archivo font-semibold italic text-green-700 opacity-75">
            TOTAL
          </h1>
          <div
            className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
          >
            <h1 className="font-archivo font-black text-green-700 text-4xl">
              {gameOver === false
                ? "-"
                : activeBall === 0
                ? ball1TotalScore
                : ball2TotalScore}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="flex w-full h-96 mt-8 justify-between items-center"
        onClick={handleTap}
        style={{
          position: "relative",
          backgroundImage: `url(${holeImages[currentHole]})`,
          backgroundSize: "40%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        {activeBall === 0 && (
          <svg
            ref={svgRef1}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></svg>
        )}
        {activeBall === 1 && (
          <svg
            ref={svgRef2}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></svg>
        )}
      </div>
      <div className="flex w-full h-1/6 mb-8 justify-between items-end px-4 absolute bottom-0 overflow-visible">
        <div className="grid grid-cols-3 h-16 gap-6 w-4/6">
          <CircularButton icon="minus" onClick={decrementPutts} />
          <div className="flex flex-col items-center">
            <div
              className="p-2 px-4 border-4 border-green-700 rounded-xl bg-white items-center justify-center"
              style={{
                boxShadow: "5px 5px #2d603a",
              }}
            >
              <h1 className="font-archivo font-black text-green-700 text-4xl">
                {activeBall === 0 ? ball1Putts : ball2Putts}
              </h1>
            </div>
            <h1 className="pt-1 font-archivo font-semibold italic text-green-700 opacity-75">
              PUTTS
            </h1>
          </div>
          <CircularButton icon="plus" onClick={incrementPutts} />
        </div>
        <div className="grid grid-rows-2 grid-cols-1 h-36 items-end">
          {(activeBall === 0 && ball1ShotHistory.length > 1) ||
          (activeBall === 1 && ball2ShotHistory.length > 1) ? (
            <CircularButton icon="arrow" onClick={undoShot} />
          ) : (
            <div className="h-16 w-16"></div>
          )}
          <CircularButton icon="check" onClick={submitScore} />
        </div>
      </div>
    </div>
  );
};

export default MultipleTracking;
