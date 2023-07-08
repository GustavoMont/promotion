import React from "react";
import { Address } from "@/models/Address";

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  return (
    <div className="h-full mt-4">
      {!address ? (
        <p className="text-red-400">* Não foi cadastrado o endereço</p>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-2xl font-bold mb-4">Endereço</h2>
          <p className="text-gray-600">{address?.street}</p>
          <p className="text-gray-600">
            {address?.city?.name || "Cidade não informada"}
          </p>

          <p className="text-gray-600">
            {address?.number || "Número não informado"}
          </p>

          <p className="text-gray-600">
            {address?.neighborhood || "Bairro não informado"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
