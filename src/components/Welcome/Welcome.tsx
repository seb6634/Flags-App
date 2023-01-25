import { FC, useState } from "react";
import "./Welcome.css";

interface WelcomeProps {
  onClick: (inputValue: string, selectValue: string) => void;
}

const Welcome: FC<WelcomeProps> = ({ onClick }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("name");
  const selectActionList = ["name", "capital", "lang", "currency"];

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="select select-bordered w-full max-w-xs my-6"
          >
            {selectActionList.map((action) => (
              <option key={action}>{action}</option>
            ))}
          </select>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input w-full max-w-xs"
          />
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn btn-primary my-6"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
