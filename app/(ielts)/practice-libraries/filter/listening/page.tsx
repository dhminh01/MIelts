import prisma from "@/lib/db";
import ListeningTestList from "@/components/filter/ListeningTestList";

// Server-side component that fetches the data and handles pagination
export default async function ListeningPracticesList({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1"); // Get the current page from query params
  const testsPerPage = 8; // Number of tests per page

  // Fetch the total count of tests for pagination
  const totalTests = await prisma.listeningTest.count();
  const totalPages = Math.ceil(totalTests / testsPerPage);

  // Fetch the tests for the current page
  const listeningTests = await prisma.listeningTest.findMany({
    skip: (currentPage - 1) * testsPerPage,
    take: testsPerPage,
  });

  return (
    <main className="flex flex-col items-center px-4 py-4 text-center gap-y-5 sm:px-6 lg:px-8">
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-blue-50">
        <h2 className="mb-4 text-2xl font-semibold text-blue-700">Listening</h2>

        {/* Render the list of listening tests */}
        <ListeningTestList tests={listeningTests} />

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <a
              href={`?page=${currentPage - 1}`}
              className={`px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300 ${
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
                    ? "bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {index + 1}
              </a>
            ))}
            <a
              href={`?page=${currentPage + 1}`}
              className={`px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300 ${
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
