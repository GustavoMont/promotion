import { Button } from "@/components/common/Button";
import { User } from "@/models/User";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  colaborators: User[];
  onClickDelete(user: User): void;
}

export const ColaboratorTable: React.FC<Props> = ({
  colaborators,
  onClickDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Cargo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {colaborators.map((colaborator) => (
            <tr key={colaborator.id}>
              <th>{colaborator.id}</th>
              <td>{colaborator.name}</td>
              <td>{colaborator.role.toLocaleLowerCase()}</td>

              <td>
                <Button onClick={() => onClickDelete(colaborator)} color="none">
                  <TrashIcon className="text-danger w-[24px] h-[24px]" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
