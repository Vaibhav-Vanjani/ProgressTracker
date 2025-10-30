import { useTrackerContext } from "../Context/ProgressTrackerContext";
import ContestQuestionListView from "./ContestQuestionListView.jsx";
import TimerDisplay from './TimerDisplay.jsx'

export default function ContestView(){

      const { navigate } = useTrackerContext();

   return (
  <section className="flex flex-col w-screen h-screen justify-center items-center bg-gray-50 text-gray-800 px-4">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mt-20 absolute top-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all"
    >
      ← Back
    </button>

    <TimerDisplay/>
    {/* Contest Questions List */}
    <ContestQuestionListView/>
  </section>
);

}