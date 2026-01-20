import React from "react";
import LightGallery from "lightgallery/react";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";



const ImageSlider = ({ property }) => {
  const images = property.images;

  return (
    // Outer container: Full width, no padding at top/sides
    <header className="w-full overflow-hidden shadow-2xl rounded-b-3xl relative z-20">
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        mode="lg-fade"
        closable={true}
        hideBarsDelay={0}
        controls={true}
        showCloseIcon={true}
        backdropDuration={300}
        // This class targets the inner container of the items
        elementClassNames="flex flex-row w-full h-[300px] md:h-[500px] bg-[#050505]"
      >
        {images.map((src, i) => (
          <a
            href={src}
            key={i}
            className="flex-1 overflow-hidden group border-r border-[#050505]/50 last:border-0 relative"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
              src={src}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
              alt={`Banner slide ${i + 1}`}
            />
          </a>
        ))}
      </LightGallery>
    </header>
  );
};

export default ImageSlider;
