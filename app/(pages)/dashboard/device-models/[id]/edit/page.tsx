"use client";
import { useDeviceModelDetailsRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelDetailsRQ";
import { useParams } from "next/navigation";
import DeviceModelForm from "../../components/DeviceModelForm";

export default function EditDeviceModelPage() {
  const { id } = useParams();

  const { isLoading, data: modelDetails } = useDeviceModelDetailsRQ(
    (id as string) || ""
  );

  const handleSubmit = async (data) => {
    try {
      // await api.put(`/deviceModels/${id}`, data);
      console.log("data", data);
      // redirect or toast success
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (!modelDetails) {
    return <>Unable to fetch model details to edit</>;
  }

  return <DeviceModelForm model={modelDetails} onSubmit={handleSubmit} />;
}
