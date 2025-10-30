import { useTrackerContext } from "../Context/ProgressTrackerContext";
export default function ContestQuestionListView(){
     const {
            contestSet,
            questionComplete,
            questionCompleteHandler,
                } = useTrackerContext();

    return <>
        <div className="flex w-full justify-center mt-10">
      <div className="w-3/4 max-w-3xl bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Contest Questions
        </h2>

        {contestSet?.length ? (
          contestSet.map((question) => (
            <div
              key={question._id}
              className={`flex justify-between items-center border-b border-gray-200 py-3 px-2 ${questionComplete.includes(question._id) ? "bg-green-500/50 hover:bg-green-500/60 transition" : "hover:bg-gray-50 transition"} ` }
            >
              <div>
                <p className="font-medium text-gray-800">
                  {question.questionName}
                </p>
                <a
                  href={question.questionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
                >
                  {question.questionLink}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {question.difficulty}
                </span>
                {!questionComplete.includes(question._id) && <span 
                  onClick={()=>questionCompleteHandler(question._id)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm cursor-pointer">
                  Completed
                </span>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No questions in this contest yet.
          </p>
        )}
      </div>
    </div>
    </>
}