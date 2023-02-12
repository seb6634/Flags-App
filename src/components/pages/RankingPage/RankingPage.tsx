import { FC, useEffect, useState } from "react";
import { usersBestScores } from "../../../services/ApiRequests";
import NotResults from "../../parts/NotResults/NotResults";
import { User } from "../../types";
import "./RankingPage.css";

interface RankingPageProps {
  user?: User;
}

const RankingPage: FC<RankingPageProps> = ({ user }) => {
  const [partialUsers, setPartialUsers] = useState<Partial<User>[]>([]);

  useEffect(() => {
    usersBestScores().then((partialUser) => {
      setPartialUsers(partialUser.data);
    });
  }, []);

  return (
    <>
      {partialUsers.length > 0 ? (
        <div className="">
          <table className="table w-1/2">
            <thead>
              <tr>
                <th>Classement</th>
                <th>Pseudo</th>
                <th>Meilleur score</th>
              </tr>
            </thead>
            <tbody>
              {partialUsers.map((partialUser: any, index: number) => (
                <tr
                  className={
                    user?.username === partialUser.username ? "active" : ""
                  }
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>{partialUser.username}</td>
                  <td className="text-center">{partialUser.best_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <NotResults message="Aucun classement disponible" />
        </>
      )}
    </>
  );
};

export default RankingPage;
