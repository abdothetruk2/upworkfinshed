import { LucideIcon } from "lucide-react";

type InformationCardProps = {
  title: string;
  numeric: number;
  icon: LucideIcon;
};

function InformationCard({ title, numeric, icon: Icon }: InformationCardProps) {
  return (
    <div className="max-w-sm p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex items-center justify-between hover:shadow-xl transition duration-300">
      <div>
        <p className="text-gray-500 text-sm uppercase font-medium">{title}</p>
        <p className="text-black text-3xl font-bold">{numeric}</p>
      </div>
      <div className="p-3 bg-yellow rounded-full">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}

export default InformationCard;
