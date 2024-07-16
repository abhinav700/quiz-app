import UserAvatar from "../UserAvatar";
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
  console.log(leaderboard);
  return (
    <>
      <div className="mt-[80px] ml-[200px]">
        <h1 className="text-[40px] font-bold">Leaderboard</h1>
        <h2 className="text-[20px] text-gray-700 font-bold">
          Only Top 20 players are displayed
        </h2>
      </div>
      <div className="flex flex-col h-[900px] w-full  mt-[20px] items-center">
        {leaderboard.map((item: any) => {
          const { id, points, name } = item;
          const width: number = Math.floor((points * 800) / 1000);
          return (
            <div key={id} className="flex w-[1000px] my-1 items-center">
              <p className="w-[75px]">{points} p</p>

              <div
                className={`mx-2 h-[40px] border border-black `}
                style={{
                  width: `${width.toString()}px`,
                  backgroundColor: `${getRandomColor()}`,
                }}
                id="leaderboard-points-bar"
              >
                <div className="user-avatar flex items-center h-full">
                  <UserAvatar url={item.avatarUrl} size={35} />
                </div>
              </div>
              {
                width != 0 ?
                <p className="username  " style = {{marginLeft :`${width< 30 ? "30px":0}`}}>

              {name}
              </p>:
               <p className=" ml-[30px]">

               {name}
               </p>
              }
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LeaderBoard;
