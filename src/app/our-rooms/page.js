import qs from 'qs';

const populate = {
    populate:{
        Media:{
            fields:['alternativeText', 'url', 'name']
        }
    }
};

function flattenStrapiResponse(data) {
    return data.map(item => {
      // Flattening the "Description"
      const description = item.Description.map(desc => {
        return desc.children.map(child => child.text).join(' ');
      }).join(' ');
  
      // Flattening the "Inclusions" and "Amenities" (extracting text from list items)
      const inclusions = item.Inclusions.map(inclusion => 
        inclusion.children.map(child => child.hasOwnProperty('children') ? child.children.map(grandChild => grandChild.text).join(' ') : child.text)
      ).flat();
  
      const amenities = item.Amenities.map(amenity => 
        amenity.children.map(child => child.children.map(grandChild => grandChild.text).join(' '))
      ).flat();
  
      // Flattening the media URLs (extracting the URLs)
      const mediaUrls = item.Media.map(media => media.url);
  
      return {
        id: item.id,
        documentId: item.documentId,
        title: item.Title,
        description: description,
        inclusions: inclusions,
        amenities: amenities,
        media: mediaUrls,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
      };
    });
  }

async function getRoomTypes() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const path = "/api/rooms";
    // const path = "/graphql";
    const url = new URL(path, baseUrl);
    const params = qs.stringify(populate);
    // const params = `populate[media][fields][0]=alternativeText&populate[media][fields][1]=url&populate[media][fields][2]=name`;
    console.log(params);

    url.search = params;

    console.log(url);

    const res = await fetch(url);
  
    if (!res.ok) throw new Error("Failed to fetch room types");
  
    const data = await res.json();
    console.log(data);
  
    return data;
}

export default async function OurRooms() {
    const roomTypes = await getRoomTypes();
    const flattenedData = flattenStrapiResponse(roomTypes.data);
    console.log(roomTypes);

    return (
      <div>
        <h1>Our Rooms</h1>
        <pre>{JSON.stringify(flattenedData, null, 2)} </pre>

      </div>
    );
}