import "./LeaderBoard.css";
type leaderboardProps = {
  leaderboard: any;
};
// id , name , points
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const LeaderBoard = ({ leaderboard }: leaderboardProps) => {
  return (
    <>
      <div className="mt-[80px] ml-[200px]">
        <h1 className="text-[40px] font-bold">Leaderboard</h1>
        <h2 className="text-[20px] text-gray-700 font-bold">Only Top 20 players are displayed</h2>
      </div>
      <div className="flex flex-col h-[900px] w-full  mt-[20px] items-center">
        {leaderboard.map((item: any) => {
          const { id, points, name } = item;
          const width: string = Math.floor((points * 800) / 1000).toString();
          return (
            <div key={id} className="flex w-[1000px] my-1">
              <p className="w-[75px]">{points} p</p>
              <div
                className={`mx-2 h-[30px] border border-black `}
                style={{
                  width: `${width}px`,
                  backgroundColor: `${getRandomColor()}`,
                }}
                id="leaderboard-points-bar"
              >
                {" "}
              </div>
              {name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LeaderBoard;
