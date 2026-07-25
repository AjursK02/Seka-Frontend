import { CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

const FeatureItem = ({
  title,
  description,
}: Props) => {
  return (
    <div className="flex gap-5">
      <CheckCircle2
        className="mt-1 text-primary"
        size={28}
      />

      <div>
        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;