import Link from "next/link";

function RoomCard({
    name,
    description,
    amenities,
    inclusions,
    media,
    slug,
  }) {
    const imageUrl = `${
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
    }${photo.url}`;
    return (
      <Link
        href={`/our-team/${slug}`}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={photo.alternativeText || name}
          width={500}
          height={500}
        />
        <div className="room-card">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    );
}

export default RoomCard;