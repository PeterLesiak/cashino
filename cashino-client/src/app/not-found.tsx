import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-white">
      <h2 className="text-7xl">
        <span className="text-red-300">404 |</span> Not Found
      </h2>
      <p className="flex gap-6 text-2xl">
        <span>Could not find requested resource.</span>
        <Link
          href="/"
          className="group flex transform items-center text-red-300 duration-300 hover:text-red-500"
        >
          <span className="-translate-x-3 transition duration-300 group-hover:-translate-x-2">
            {'>'}
          </span>
          <span>Return Home</span>
          <span className="translate-x-3 transition duration-300 group-hover:translate-x-2">
            {'<'}
          </span>
        </Link>
      </p>
    </div>
  );
}
