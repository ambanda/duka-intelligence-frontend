import { BarChart3, TrendingUp, Wallet } from "lucide-react";
import TierCard from "./TierCard";

export default function Tiers() {
  return (
    <section className="py-16 md:py-20 px-6">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Intelligence, built in layers
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <TierCard
          icon={BarChart3}
          title="Core Intelligence"
          items={[
            "Revenue performance",
            "Product performance",
            "Inventory health & stock movement",
          ]}
        />

        <TierCard
          icon={TrendingUp}
          title="Growth Intelligence"
          items={[
            "Market & peer benchmarking",
            "Inventory planning",
            "Demand forecasting",
          ]}
        />

        <TierCard
          icon={Wallet}
          title="Financial Intelligence"
          items={[
            "Merchandise financial planning",
            "Assortment optimization",
            "Credit & risk intelligence",
          ]}
        />
      </div>
    </section>
  );
}
