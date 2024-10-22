import prisma from "@/lib/db";

export default async function TestPage({ params }) {
  const test = await prisma.ieltsTest.findUnique({
    where: {
      id: params.id,
    },
    include: {
      IeltsSection: true, // Bao gồm cả các phần của bài thi
    },
  });

  return (
    <div>
      <h1>{test.title}</h1>
      <p>Skill: {test.skill}</p>
      <p>Part: {test.part}</p>
      {test.audioUrl && (
        <div>
          <p>Audio:</p>
          <audio controls src={test.audioUrl} />
        </div>
      )}
      <h2>Sections:</h2>
      <ul>
        {test.IeltsSection.map((section) => (
          <li key={section.id}>
            <h3>Section {section.sectionNumber}</h3>
            <p>
              Time Limit:{" "}
              {section.timeLimit ? `${section.timeLimit} minutes` : "No Limit"}
            </p>
            <h4>Questions:</h4>
            <ul>
              {section.questions.map((question) => (
                <li key={question.id}>
                  <p>{question.question}</p>
                  {question.options && (
                    <ul>
                      {JSON.parse(question.options).map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
