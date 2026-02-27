export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#F26B5E] mb-4">404</h1>
        <p className="text-xl text-[#6F6F6F] mb-6">Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#F26B5E] text-white rounded-2xl hover:bg-[#e05a4e] transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
