export default function QuestionCollection({questionList}){

  const map = new Map([["Easy",1],["Medium",2],["Hard",3]]);
  questionList?.sort((a,b)=>{
     const aVal = map.get(a?.difficulty) ?? 999; 
    const bVal = map.get(b?.difficulty) ?? 999;
    return aVal - bVal;
  })

    return (
              <ul className="space-y-3">
                {questionList.map((question, qIdx) => (
                  <li
                    key={question._id}
                    className="flex flex-wrap justify-between items-center bg-gray-100 hover:bg-gray-200 transition rounded-lg p-3"
                  >
                    <a
                      href={question.questionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 font-medium hover:underline w-full sm:w-auto"
                    >
                      {question.questionName}
                    </a>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mt-2 sm:mt-0">
                      <span
                        className={`px-2 py-1 rounded-md font-medium ${
                          question.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : question.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {question.difficulty}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md font-medium ${
                          question.markForRevision
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        Revision: {question.markForRevision ? "Yes" : "No"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md font-medium ${
                          question.markCompleted
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        Done: {question.markCompleted ? "Yes" : "No"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )
}