import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className={"bg-blue-50 p-4"}>
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt={"property image"}
            className={"object-cover mx-auto rounded-xl"}
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className={"grid grid-cols-2 gap-4"}>
            {images.map((image, index) => (
              <div
                className={`${images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}`}
                key={index}
              >
                <Image
                  src={image}
                  alt={"property image"}
                  className={"object-cover w-full rounded-xl"}
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
