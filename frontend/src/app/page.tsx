import "server-only";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Landing Page",
};

type DataType = {
  name: string;
  username: string;
  githubLink: string;
};

const Data: DataType[] = [
  {
    name: "Ahmed Sulaimon",
    username: "@Ahmedsulaimon",
    githubLink: "https://github.com/Ahmedsulaimon",
  },
  {
    name: "Ayman Sammo",
    username: "@sammo-2000",
    githubLink: "https://github.com/sammo-2000",
  },
  {
    name: "Nayan Stanley",
    username: "@nayan-builds",
    githubLink: "https://github.com/nayan-builds",
  },
];

export default function HomePage() {
  return (
    <div className={"flex min-h-svh flex-col items-center justify-center"}>
      <div className="p-6 text-center font-sans">
        <h1 className="mb-2 text-2xl font-bold">Library Management System</h1>

        <span className="text-sm text-muted-foreground">
          Contribute to the project
        </span>

        <div className="mt-6 overflow-x-auto">
          <table className="mx-auto w-full max-w-md table-auto border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-white text-left">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Github</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((person: DataType) => {
                return (
                  <tr
                    key={person.githubLink}
                    className="even:bg-white hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {person.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link className={"underline"} href={person.githubLink}>
                        {person.username}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
