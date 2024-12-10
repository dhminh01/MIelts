import prisma from "@/lib/db";
import ReadingTestList from "@/components/filter/ReadingTestList";

export default async function ReadingPracticesList({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1");
  const testsPerPage = 8;

  const totalTests = await prisma.readingTest.count();
  const totalPages = Math.ceil(totalTests / testsPerPage);

  const readingTests = await prisma.readingTest.findMany({
    skip: (currentPage - 1) * testsPerPage,
    take: testsPerPage,
  });

  return (
    <main className="flex flex-col items-center px-4 py-4 text-center gap-y-5 sm:px-6 lg:px-8">
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-green-50">
        <h2 className="mb-4 text-2xl font-semibold text-green-700">Reading</h2>

        {/* Render the list of reading tests */}
        <ReadingTestList tests={readingTests} />

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <a
              href={`?page=${currentPage - 1}`}
              className={`px-4 py-2 text-white bg-green-500 rounded disabled:bg-gray-300 ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              Previous
            </a>
            {[...Array(totalPages)].map((_, index) => (
              <a
                key={index}
                href={`?page=${index + 1}`}
                className={`px-4 py-2 text-white rounded ${
                  currentPage === index + 1
                    ? "bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {index + 1}
              </a>
            ))}
            <a
              href={`?page=${currentPage + 1}`}
              className={`px-4 py-2 text-white bg-green-500 rounded disabled:bg-gray-300 ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              Next
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
