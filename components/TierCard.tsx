type TierCardProps = {
  icon: string;
  title: string;
  items: string[];
};

export default function TierCard({ icon, title, items }: TierCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition">
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <ul className="space-y-2 text-gray-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
