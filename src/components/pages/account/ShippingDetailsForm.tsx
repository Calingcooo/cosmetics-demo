import React, { useState, useEffect } from "react";
import PSGC from "@efdiaz/psgc";

import Header from "./Header";
import InputField from "@/components/ui/input/InputField";
import SelectField from "@/components/ui/select/SelectField";

type CurrentAddress = {
  house_number?: string;
  street_name?: string;
  region_label?: string;
  province_label?: string;
  city_label?: string;
  barangay_label?: string;
  zip_code?: string;
  landmark?: string;
};

type Address = {
  label: string;
  value: string;
};

interface FormData {
  house_number: string;
  street_name: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  zip_code: string;
  landmark: string;
}

type ShippingDetailsFormProps = {
  shipping: CurrentAddress;
};

const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = ({
  shipping,
}) => {
  const [formData, setFormData] = useState<FormData>({
    house_number: "",
    street_name: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    zip_code: "",
    landmark: "",
  });

  const [regions, setRegions] = useState<Address[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [cities, setCities] = useState<Address[]>([]);
  const [barangays, setBarangays] = useState<Address[]>([]);

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (shipping) {
      setFormData((prev) => ({
        ...prev,
        house_number: shipping.house_number ?? "",
        street_name: shipping.street_name ?? "",
        region: shipping.region_label ?? "",
        province: shipping.province_label ?? "",
        city: shipping.city_label ?? "",
        barangay: shipping.barangay_label ?? "",
        zip_code: shipping.zip_code ?? "",
        landmark: shipping.landmark ?? "",
      }));
    }
  }, [shipping]);

  // Load regions
  useEffect(() => {
    const data = PSGC.getRegions().map(
      (r: { regDesc: string; regCode: string }) => ({
        label: r.regDesc,
        value: r.regCode,
      })
    );
    setRegions(data);
  }, []);

  // Update provinces
  useEffect(() => {
    if (formData.region) {
      const data = PSGC.getProvinces(formData.region).map(
        (p: { provDesc: string; provCode: string }) => ({
          label: p.provDesc,
          value: p.provCode,
        })
      );
      setProvinces(data);
      setCities([]);
      setBarangays([]);
      setFormData((prev) => ({
        ...prev,
        province: "",
        city: "",
        barangay: "",
      }));
    }
  }, [formData.region]);

  // Update cities
  useEffect(() => {
    if (formData.province) {
      const data = PSGC.getCityMuns(formData.province).map(
        (c: { citymunDesc: string; citymunCode: string }) => ({
          label: c.citymunDesc,
          value: c.citymunCode,
        })
      );
      setCities(data);
      setBarangays([]);
      setFormData((prev) => ({ ...prev, city: "", barangay: "" }));
    }
  }, [formData.province]);

  // Update barangays
  useEffect(() => {
    if (formData.city) {
      const data = PSGC.getBarangays(formData.city).map(
        (b: { brgyDesc: string; brgyCode: string }) => ({
          label: b.brgyDesc,
          value: b.brgyCode,
        })
      );
      setBarangays(data);
      setFormData((prev) => ({ ...prev, barangay: "" }));
    }
  }, [formData.city]);

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      region_label: regions.find((r) => r.value === formData.region)?.label,
      province_label: provinces.find((p) => p.value === formData.province)
        ?.label,
      city_label: cities.find((c) => c.value === formData.city)?.label,
      barangay_label: barangays.find((b) => b.value === formData.barangay)
        ?.label,
    };

    console.log("Submitted shipping details:", dataToSave);
  };

  return (
    <div className="space-y-4 bg-[theme(--card)] p-5">
      <Header
        title="Shipping Details"
        subtitle="Manage your shipping address"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            id="house_number"
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            placeholder="Blk 12 Lot 5 / Unit 3A"
          />
          <InputField
            id="street_name"
            name="street_name"
            value={formData.street_name}
            onChange={handleChange}
            placeholder="Mabini Street"
          />
        </div>

        {/* Region */}
        <SelectField
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="Select Region"
          options={regions}
        />

        {/* Province */}
        <SelectField
          id="province"
          name="province"
          value={formData.province}
          onChange={handleChange}
          placeholder={
            formData.region ? "Select Province" : "Choose region first"
          }
          options={provinces.length > 0 ? provinces : []}
          disabled={!formData.region}
        />

        {/* City / Municipality */}
        <SelectField
          id="City / Municipality"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder={
            formData.province
              ? "Select City / Municipality"
              : "Choose province first"
          }
          options={cities.length > 0 ? cities : []}
          disabled={!formData.province}
        />

        {/* Barangay */}
        <SelectField
          id="barangay"
          name="barangay"
          value={formData.barangay}
          onChange={handleChange}
          placeholder={formData.city ? "Select Barangay" : "Choose city first"}
          options={barangays.length > 0 ? barangays : []}
          disabled={!formData.city}
        />

        {/* Postal info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            placeholder="1101"
          />
          <InputField
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="inline-flex capitalize items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors disabled:pointer-events-none disabled:opacity-50 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 h-10 px-4 py-2 cursor-pointer"
          >
            Save Shipping Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetailsForm;
