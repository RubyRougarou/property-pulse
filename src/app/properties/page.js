import PropertyCard from "@/app/_components/PropertyCard";
import { getProperties } from "@/app/_libs/requests";
import SearchPropertyForm from "@/app/_components/SearchPropertyForm";

export default async function PropertiesPage() {
  const properties = await getProperties();

  // Sort properties by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchPropertyForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties?.length === 0 ? (
            <p>No properties found...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties?.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
