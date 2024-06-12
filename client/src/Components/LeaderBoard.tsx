
type leaderboardProps = {
    leaderboard: any;
}

const LeaderBoard = ({leaderboard}: leaderboardProps) => {
  return (
    <div>LeaderBoard
        {JSON.stringify(leaderboard)}
    </div>
  )
}

export default LeaderBoard