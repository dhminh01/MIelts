// app/(2023tests)/(Jan)/listening-jan-2023-test/page.tsx
import db from '@/lib/db';

export default async function ListeningTestsPage() {
  const listeningTests = await db.listeningTest.findMany({
    include: {
      sections: {
        include: {
          questions: true,
        },
      },
    },
  });

  return (
    <div>
      <h1>Listening Tests - January 2023</h1>
      {listeningTests.length === 0 ? (
        <p>No listening tests found.</p>
      ) : (
        listeningTests.map((test) => (
          <div key={test.id} className="mb-8">
            <h2 className="text-2xl font-bold">{test.title}</h2>
            {test.sections.map((section) => (
              <div key={section.id} className="mt-4">
                <h3 className="text-xl">{section.title}</h3>
                {section.audioURL && (
                  <audio controls>
                    <source src={section.audioURL} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                <ul>
                  {section.questions.map((question) => (
                    <li key={question.id} className="mt-2">
                      <strong>{`Question ${question.questionNum}:`}</strong> {question.questionText}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
