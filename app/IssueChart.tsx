"use client";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface IssueChartProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: IssueChartProps) => {
  const data: { label: string; value: number }[] = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  if (open === 0 && inProgress === 0 && closed === 0) return null;

  return (
    <Card className="mb-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{
              fill: "#4F46E5",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default IssueChart;
