import {
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property:{" "}
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <TelegramShareButton url={shareUrl} title={property.name}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator={":: "}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtag={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check our this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
