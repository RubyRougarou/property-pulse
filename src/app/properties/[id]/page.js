"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProperty } from "@/app/_libs/requests";
import PropertyHeaderImage from "@/app/_components/PropertyHeaderImage";
import GoBack from "@/app/_components/GoBack";
import PropertyInfo from "@/app/_components/PropertyInfo";
import Spinner from "@/app/_components/Spinner";

const IdPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function effectGetProperty() {
      if (!id) return;

      try {
        const property = await getProperty(id);
        setProperty(property);
      } catch (err) {
        console.error("Error fetching property!", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (property === null) effectGetProperty();
  }, [id, property]);

  if (!property && !isLoading)
    return (
      <h1 className={"text-center text-2xl font-bold mt-10"}>
        Property Not Found!
      </h1>
    );

  return (
    <>
      {isLoading && <Spinner loading={isLoading} />}
      {!isLoading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <GoBack to={"properties"} />
          <PropertyInfo property={property} />
        </>
      )}
    </>
  );
};

export default IdPage;
