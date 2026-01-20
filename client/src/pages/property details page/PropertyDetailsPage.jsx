import ImageSlider from "./property details page component/image slider/ImageSlider";
import PropertyInfo from "./property details page component/property info/PropertyInfo";
import GridSection from "./property details page component/grid section/GridSection";
import usePropertyById from "../../hooks/usePropertyById";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useEffect } from "react";
import Loading from "../../component/loading/Loading";


const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  if (isLoading) {
    return Loading();
  }

  return (
    <div>
      <ImageSlider property={property}></ImageSlider>
      <div className="px-1 md:px-4">
        <PropertyInfo property={property}></PropertyInfo>
        <GridSection property={property}></GridSection>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
