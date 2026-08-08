import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminPage() {
  const cards = [
    {
      title: "Upload Dataset",
      description: "Upload JSON question banks",
      href: "/admin/uploads",
    },
    {
  title: "Dataset Manager",
  description: "Manage uploaded datasets",
  href: "/admin/datasets",
},
    {
      title: "Courses",
      description: "Manage courses and boards",
      href: "/admin/courses",
    },
    {
      title: "Subjects",
      description: "Manage subjects",
      href: "/admin/subjects",
    },
    {
      title: "Chapters",
      description: "Manage chapters",
      href: "/admin/chapters",
    },
    {
      title: "Users",
      description: "Manage users",
      href: "/admin/users",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Panel
          </h1>

          <p className="var(--color-text-muted)500 mt-2">
            Manage datasets, courses, subjects and users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="border rounded-xl p-6 hover:bg-[#7a233b]50 transition"
            >
              <h2 className="text-xl font-semibold">
                {card.title}
              </h2>

              <p className="var(--color-text-muted)500 mt-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}