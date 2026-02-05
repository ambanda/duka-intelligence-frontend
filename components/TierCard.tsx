type TierCardProps = {
  title: string;
  items: string[];
};
export default function TierCard({ title, items }: TierCardProps) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index}> {item}</li>
        ))}
      </ul>
    </div>
  );
}