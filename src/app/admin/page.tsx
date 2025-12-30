import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  const results = await prisma.result.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto p-8 pt-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-lg mt-2">Manage student results and platform activity</p>
        </div>
        <div className="bg-slate-100 px-6 py-2 rounded-full font-medium text-slate-700">
          Admin: {session.user?.name}
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden rounded-3xl">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
          <CardTitle>Student Mock Test Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="px-8 py-4">Student</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Band Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-8 py-4 font-medium">{result.user.username}</TableCell>
                  <TableCell>
                    <span className="capitalize px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                      {result.type.toLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-slate-900">{result.score}</span>
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <button className="text-slate-900 font-semibold hover:underline">View Details</button>
                  </TableCell>
                </TableRow>
              ))}
              {results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                    No results found yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
