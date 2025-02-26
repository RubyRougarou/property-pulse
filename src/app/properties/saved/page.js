"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/app/_components/PropertyCard";
import { toast } from "react-toastify";
import Spinner from "@/app/_components/Spinner";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to get the data...");
      } finally {
        setLoading(false);
      }
    };
    getSavedProperties();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl font-bold ml-6 mb-1">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <p>No saved properties found...</p>
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

export default SavedPropertiesPage;
