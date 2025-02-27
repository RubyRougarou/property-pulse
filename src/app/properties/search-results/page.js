"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import Spinner from "@/app/_components/Spinner";
import PropertyCard from "@/app/_components/PropertyCard";
import GoBack from "@/app/_components/GoBack";
import { FaArrowCircleLeft } from "react-icons/fa";

const SearchPropertiesPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const getSearchedProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getSearchedProperties();
  }, [location, propertyType]);

  console.log(properties);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Results : </h1>
        {properties?.length === 0 ? (
          <p>No results found...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPropertiesPage;
