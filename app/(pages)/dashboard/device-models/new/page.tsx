"use client";

import DeviceModelForm from "./DeviceModelForm";

export default function NewDeviceModelPage() {
  const handleSubmit = async (data) => {
    try {
      // redirect or toast success
    } catch (err) {
      console.error(err);
    }
  };

  return <DeviceModelForm onSubmit={handleSubmit} />;
}
