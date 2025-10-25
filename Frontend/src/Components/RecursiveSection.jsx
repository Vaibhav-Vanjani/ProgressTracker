import { useState } from "react";

export default function RecursiveSection({ sheetName }) {
  const [sectionArr, setSectionArr] = useState(["section-0"]);
  const [questionArr, setQuestionArr] = useState({});
  const [questionForm, setQuestionForm] = useState({});
  const [sectionName, setSectionName] = useState({});

  function questionFormHandler(event, id) {
    const { name, value } = event.target;
    setQuestionForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  }

  function submittedQuestionHandler(event, id) {
    event.preventDefault();
    setQuestionArr((prev) => {
      const newPrev = { ...prev };
      if (!newPrev[id]) newPrev[id] = [questionForm[id]];
      else newPrev[id].push(questionForm[id]);
      return newPrev;
    });
    setQuestionForm((prev) => ({ ...prev, [id]: {} })); // Clear form after submit
  }

  function addSectionHandler() {
    setSectionArr((prev) => [...prev, Date.now()]);
  }

  function deleteSectionHandler(id) {
    setSectionArr((prev) => prev.filter((key) => String(key) !== String(id)));
    setQuestionArr((prev) => {
      const newPrev = { ...prev };
      delete newPrev[id];
      return newPrev;
    });
  }

  function createSheetHandler() {
    const resultObject = {
      sheetName,
      createdBy: "ViewOnly",
      section: sectionArr.map((id) => ({
        subsectionName: sectionName[id],
        subsection: questionArr[id],
      })),
    };
    console.log(resultObject,sectionName, "createSheetHandler");
  }

  return (
    <div className="flex flex-col gap-6 mt-8">
      {sectionArr.map((section) => (
        <div
          key={section}
          className="border border-gray-300 bg-white rounded-lg shadow-sm p-4"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Section Name"
              id={section}
              onChange={(e) =>
                setSectionName((prev) => ({
                  ...prev,
                  [section]: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-2/3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => deleteSectionHandler(section)}
              className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Delete Section
            </button>
          </div>

          {/* Question List */}
          {questionArr?.[section]?.length > 0 && (
            <div className="mb-4 border-t border-gray-200 pt-3">
              <h3 className="text-gray-700 font-semibold mb-2">Questions:</h3>
              <ul className="space-y-2">
                {questionArr[section].map((question, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 rounded-md p-3 border border-gray-200 text-sm text-gray-800 flex flex-col sm:flex-row sm:justify-between"
                  >
                    <span className="font-semibold">{question.name}</span>
                    <div className="flex flex-col sm:flex-row gap-3 mt-1 sm:mt-0 text-gray-600">
                      <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Link
                      </a>
                      <span>{question.notes}</span>
                      <span
                        className={`${
                          question.difficulty === "Easy"
                            ? "text-green-600"
                            : question.difficulty === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        } font-semibold`}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add Question Form */}
          <fieldset className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <legend className="px-2 text-gray-700 font-semibold">
              Add Question
            </legend>

            <form
              onSubmit={(e) => submittedQuestionHandler(e, section)}
              className="flex flex-col gap-3 mt-2"
            >
              <input
                value={questionForm[section]?.name || ""}
                name="name"
                type="text"
                placeholder="Question Name"
                onChange={(e) => questionFormHandler(e, section)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                value={questionForm[section]?.link || ""}
                name="link"
                type="text"
                placeholder="Question Link"
                onChange={(e) => questionFormHandler(e, section)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                value={questionForm[section]?.notes || ""}
                name="notes"
                type="text"
                placeholder="Notes"
                onChange={(e) => questionFormHandler(e, section)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <select
                value={questionForm[section]?.difficulty || ""}
                name="difficulty"
                onChange={(e) => questionFormHandler(e, section)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
              >
                Add Question
              </button>
            </form>
          </fieldset>
        </div>
      ))}

      {/* Global Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={addSectionHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition"
        >
          + Add Section
        </button>
        <button
          onClick={createSheetHandler}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md transition"
        >
          ✅ Create Sheet
        </button>
      </div>
    </div>
  );
}
