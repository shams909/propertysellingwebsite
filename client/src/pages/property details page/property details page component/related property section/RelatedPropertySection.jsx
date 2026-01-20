import SinglePropertyCard from "../../../all property/all property components/single property card/SinglePropertyCard";
import useProperties from "../../../../hooks/useProperties";

const RelatedPropertySection = ({ property }) => {
  const filters = { propertyType: property.propertyType };

  const { data: properties = [] } = useProperties(filters);

  const relatedProperties = properties
    .filter((p) => p._id !== property._id)
    .slice(0, 3);

  // ✅ early return
  if (relatedProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No related properties found.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-8 px-2 md:px-0">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Related <span className="text-orange-600">Property</span>
        </h2>
        <p className="text-gray-600">
          Everything you need for comfort and security.
        </p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedProperties.map((prop) => (
          <SinglePropertyCard key={prop._id} property={prop} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPropertySection;
