"use client";

import React, { useState, useEffect } from "react";
import PSGC from "@efdiaz/psgc";

import { useUser } from "@/lib/hooks/user/useUser";
import type { User } from "@/app/types";

import TabHeader from "./TabHeader";
import InputField from "@/components/ui/input/InputField";
import SelectField from "@/components/ui/select/SelectField";

type ShippingUser = Pick<
  User,
  | "house_number"
  | "street_name"
  | "region_label"
  | "region_code"
  | "province_label"
  | "province_code"
  | "city_label"
  | "city_code"
  | "barangay_label"
  | "barangay_code"
  | "zip_code"
  | "landmark"
>;

type Address = {
  label: string;
  value: string;
  code?: string;
};

interface FormData {
  house_number: string;
  street_name: string;
  region: string;
  region_code: string;
  province: string;
  province_code: string;
  city: string;
  city_code: string;
  barangay: string;
  barangay_code: string;
  zip_code: string;
  landmark: string;
}

type ShippingDetailsFormProps = {
  shipping: ShippingUser;
};

const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = ({
  shipping,
}) => {
  const { updateMe } = useUser();
  const [formData, setFormData] = useState<FormData>({
    house_number: "",
    street_name: "",
    region: "",
    region_code: "",
    province: "",
    province_code: "",
    city: "",
    city_code: "",
    barangay: "",
    barangay_code: "",
    zip_code: "",
    landmark: "",
  });

  const [regions, setRegions] = useState<Address[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [cities, setCities] = useState<Address[]>([]);
  const [barangays, setBarangays] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes with code capture
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "region") {
      const selectedRegion = regions.find((r) => r.value === value);
      setFormData((prev) => ({
        ...prev,
        region: value,
        region_code: selectedRegion?.code || value,
        province: "",
        province_code: "",
        city: "",
        city_code: "",
        barangay: "",
        barangay_code: "",
      }));
    } else if (name === "province") {
      const selectedProvince = provinces.find((p) => p.value === value);
      setFormData((prev) => ({
        ...prev,
        province: value,
        province_code: selectedProvince?.code || value,
        city: "",
        city_code: "",
        barangay: "",
        barangay_code: "",
      }));
    } else if (name === "city") {
      const selectedCity = cities.find((c) => c.value === value);
      setFormData((prev) => ({
        ...prev,
        city: value,
        city_code: selectedCity?.code || value,
        barangay: "",
        barangay_code: "",
      }));
    } else if (name === "barangay") {
      const selectedBarangay = barangays.find((b) => b.value === value);
      setFormData((prev) => ({
        ...prev,
        barangay: value,
        barangay_code: selectedBarangay?.code || value,
      }));
    } else {
      handleChange(e);
    }
  };

  // Load regions with codes
  useEffect(() => {
    const loadRegions = () => {
      const data = PSGC.getRegions().map(
        (r: { regDesc: string; regCode: string }) => ({
          label: r.regDesc,
          value: r.regCode,
          code: r.regCode,
        })
      );
      setRegions(data);
      setIsLoading(false);
    };

    loadRegions();
  }, []);

  // Update provinces when region is selected or pre-filled
  useEffect(() => {
    if (formData.region) {
      const data = PSGC.getProvinces(formData.region).map(
        (p: { provDesc: string; provCode: string }) => ({
          label: p.provDesc,
          value: p.provCode,
          code: p.provCode,
        })
      );
      setProvinces(data);
    } else {
      setProvinces([]);
    }
  }, [formData.region]);

  // Update cities when province is selected or pre-filled
  useEffect(() => {
    if (formData.province) {
      const data = PSGC.getCityMuns(formData.province).map(
        (c: { citymunDesc: string; citymunCode: string }) => ({
          label: c.citymunDesc,
          value: c.citymunCode,
          code: c.citymunCode,
        })
      );
      setCities(data);
    } else {
      setCities([]);
    }
  }, [formData.province]);

  // Update barangays when city is selected or pre-filled
  useEffect(() => {
    if (formData.city) {
      const data = PSGC.getBarangays(formData.city).map(
        (b: { brgyDesc: string; brgyCode: string }) => ({
          label: b.brgyDesc,
          value: b.brgyCode,
          code: b.brgyCode,
        })
      );
      setBarangays(data);
    } else {
      setBarangays([]);
    }
  }, [formData.city]);

  // Prefill form data AFTER regions are loaded
  useEffect(() => {
    if (!isLoading && shipping && regions.length > 0) {
      const prefillFormData = async () => {
        let newFormData: FormData = {
          house_number: shipping.house_number ?? "",
          street_name: shipping.street_name ?? "",
          region: shipping.region_code ?? "",
          region_code: shipping.region_code ?? "",
          province: shipping.province_code ?? "",
          province_code: shipping.province_code ?? "",
          city: shipping.city_code ?? "",
          city_code: shipping.city_code ?? "",
          barangay: shipping.barangay_code ?? "",
          barangay_code: shipping.barangay_code ?? "",
          zip_code: shipping.zip_code ?? "",
          landmark: shipping.landmark ?? "",
        };

        // If we have region code, verify it exists in regions
        if (shipping.region_code) {
          const regionExists = regions.some(
            (r) => r.value === shipping.region_code
          );
          if (!regionExists) {
            newFormData.region = "";
            newFormData.region_code = "";
          }
        }

        // If we have province code and region is set, load provinces and verify
        if (shipping.province_code && newFormData.region) {
          const provinceData = PSGC.getProvinces(newFormData.region).map(
            (p: { provDesc: string; provCode: string }) => ({
              label: p.provDesc,
              value: p.provCode,
              code: p.provCode,
            })
          );
          setProvinces(provinceData);

          const provinceExists = provinceData.some(
            (p) => p.value === shipping.province_code
          );
          if (!provinceExists) {
            newFormData.province = "";
            newFormData.province_code = "";
          }
        }

        // If we have city code and province is set, load cities and verify
        if (shipping.city_code && newFormData.province) {
          const cityData = PSGC.getCityMuns(newFormData.province).map(
            (c: { citymunDesc: string; citymunCode: string }) => ({
              label: c.citymunDesc,
              value: c.citymunCode,
              code: c.citymunCode,
            })
          );
          setCities(cityData);

          const cityExists = cityData.some(
            (c) => c.value === shipping.city_code
          );
          if (!cityExists) {
            newFormData.city = "";
            newFormData.city_code = "";
          }
        }

        // If we have barangay code and city is set, load barangays and verify
        if (shipping.barangay_code && newFormData.city) {
          const barangayData = PSGC.getBarangays(newFormData.city).map(
            (b: { brgyDesc: string; brgyCode: string }) => ({
              label: b.brgyDesc,
              value: b.brgyCode,
              code: b.brgyCode,
            })
          );
          setBarangays(barangayData);

          const barangayExists = barangayData.some(
            (b) => b.value === shipping.barangay_code
          );
          if (!barangayExists) {
            newFormData.barangay = "";
            newFormData.barangay_code = "";
          }
        }

        setFormData(newFormData);
      };

      prefillFormData();
    }
  }, [shipping, regions, isLoading]);

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Find the selected addresses to get labels
    const selectedRegion = regions.find((r) => r.value === formData.region);
    const selectedProvince = provinces.find(
      (p) => p.value === formData.province
    );
    const selectedCity = cities.find((c) => c.value === formData.city);
    const selectedBarangay = barangays.find(
      (b) => b.value === formData.barangay
    );

    const dataToSave: Partial<User> = {
      house_number: formData.house_number,
      street_name: formData.street_name,
      region_label: selectedRegion?.label || "",
      region_code: formData.region_code,
      province_label: selectedProvince?.label || "",
      province_code: formData.province_code,
      city_label: selectedCity?.label || "",
      city_code: formData.city_code,
      barangay_label: selectedBarangay?.label || "",
      barangay_code: formData.barangay_code,
      zip_code: formData.zip_code,
      landmark: formData.landmark,
    };

    await updateMe(dataToSave);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 bg-[theme(--card)] p-5">
        <TabHeader
          title="Shipping Details"
          subtitle="Manage your shipping address"
        />
        <div className="text-center py-8">Loading address data...</div>
      </div>
    );
  }

  console.log(formData)

  return (
    <div className="space-y-4 bg-[theme(--card)] p-5">
      <TabHeader
        title="Shipping Details"
        subtitle="Manage your shipping address"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            placeholder="Blk 12 Lot 5 / Unit 3A"
            label="House/Unit Number"
          />
          <InputField
            name="street_name"
            value={formData.street_name}
            onChange={handleChange}
            placeholder="Mabini Street"
            label="Street Name"
          />
        </div>

        {/* Region */}
        <SelectField
          name="region"
          value={formData.region}
          onChange={handleSelectChange}
          placeholder="Select Region"
          options={regions}
          label="Region"
        />

        {/* Province */}
        <SelectField
          name="province"
          value={formData.province}
          onChange={handleSelectChange}
          placeholder={
            formData.region ? "Select Province" : "Choose region first"
          }
          options={provinces}
          disabled={!formData.region}
          label="Province"
        />

        {/* City */}
        <SelectField
          name="city"
          value={formData.city}
          onChange={handleSelectChange}
          placeholder={
            formData.province
              ? "Select City / Municipality"
              : "Choose province first"
          }
          options={cities}
          disabled={!formData.province}
          label="City/Municipality"
        />

        {/* Barangay */}
        <SelectField
          name="barangay"
          value={formData.barangay}
          onChange={handleSelectChange}
          placeholder={formData.city ? "Select Barangay" : "Choose city first"}
          options={barangays}
          disabled={!formData.city}
          label="Barangay"
        />

        {/* Postal info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            placeholder="1101"
            label="ZIP Code"
          />
          <InputField
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="(optional)"
            label="Landmark (Optional)"
          />
        </div>

        {/* Debug info (remove in production) */}
        {/* <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
          <div>Region Code: {formData.region_code}</div>
          <div>Province Code: {formData.province_code}</div>
          <div>City Code: {formData.city_code}</div>
          <div>Barangay Code: {formData.barangay_code}</div>
        </div> */}

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
