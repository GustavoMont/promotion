import { User } from "@/models/User";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  colaborators: User[];
}

export const ColaboratorTable: React.FC<Props> = ({ colaborators }) => {
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
                <TrashIcon className="text-danger w-[24px] h-[24px]" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
