import PropertyDetail from "@/app/_components/PropertyDetail";
import PropertyImages from "@/app/_components/PropertyImages";
import BookmarkButton from "@/app/_components/BookmarkButton";
import ShareButton from "@/app/_components/ShareButton";
import ContactForm from "@/app/_components/ContactForm";

const PropertyInfo = ({ property }) => {
  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-14">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetail property={property} />
            {/*// <!-- Sidebar -->*/}
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButton property={property} />
              <ContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyInfo;
