import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type TierCardProps = {
  icon?: ComponentType<LucideProps>;
  title: string;
  items: string[];
};
export default function TierCard({ icon, title, items }: TierCardProps) {
  const Icon = icon;
  return (
    <div className="p-6 border border-orange-100 rounded-2xl shadow-sm bg-gradient-to-br from-amber-50 via-white to-sky-50 transition hover:-translate-y-1 hover:shadow-md">
      {Icon ? (
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-orange-50 text-orange-600 mb-4"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index}> {item}</li>
        ))}
      </ul>
    </div>
  );
}
