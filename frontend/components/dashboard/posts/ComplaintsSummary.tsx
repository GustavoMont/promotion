import { Complaint } from "@/models/Complaints";
import React from "react";
import { groupBy } from "lodash";
import { Button } from "@/components/common/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  complaints: Complaint[];
  close(): void;
}

export const ComplaintsSummary: React.FC<Props> = ({ complaints, close }) => {
  const groupComplaints = groupBy(complaints, (c) => c.reason);

  const handleBadgeColor = (index: number) => {
    switch (index % 4) {
      case 0:
        return "badge-warning";

      case 1:
        return "badge-accent";
      case 2:
        return "badge-primary";
      case 3:
        return "badge-secondary";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="bg-slate-300 p-8 rounded-md relative">
      <Button
        onClick={close}
        color="none"
        className="absolute right-0 top-1 font-medium"
      >
        <XMarkIcon className="w-4 font-medium" />
      </Button>
      {complaints.length === 0 ? (
        <p className="font-medium">Post não denunciado</p>
      ) : (
        <div className="flex flex-col gap-3">
          {Object.entries(groupComplaints).map(([key, value], i) => (
            <div className="flex items-center gap-2" key={key}>
              <div className={`badge ${handleBadgeColor(i)} gap-2`}>{key}</div>
              <span>{value.length} denúnicas</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
