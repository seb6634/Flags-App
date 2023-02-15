import { FC, useEffect, useState } from "react";
import { usersBestScores } from "../../../services/ApiRequests";
import Loader from "../../parts/Loader/Loader";
import NotResults from "../../parts/NotResults/NotResults";
import { User } from "../../types";
import "./RankingPage.css";

interface RankingPageProps {
  user?: User;
}

const RankingPage: FC<RankingPageProps> = ({ user }) => {
  const [partialUsers, setPartialUsers] = useState<Partial<User>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersBestScores()
      .then((partialUser) => {
        // reorder the array by best score
        const partialUserSorted = partialUser.data.sort((a: any, b: any) => {
          return b.best_score - a.best_score;
        });
        setPartialUsers(partialUserSorted);
        setLoading(false);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <h1 className="text-4xl font-bold ">Classement</h1>
          {partialUsers.length > 0 ? (
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
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
                      <td className="flex items-center gap-2">
                        <div className="w-8 rounded-full">
                          <img
                            src={
                              partialUser?.avatar
                                ? partialUser.avatar
                                : "avatar/avatar-0.png"
                            }
                            alt="profile-img"
                          />
                        </div>
                        <p>
                          {" "}
                          {partialUser.username.length < 10
                            ? partialUser.username
                            : partialUser.username.slice(0, 10) + "..."}
                        </p>
                      </td>
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
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default RankingPage;
