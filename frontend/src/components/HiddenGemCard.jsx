import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin } from "lucide-react";

const HiddenGemCard = ({ name, description, submittedBy, image }) => {
  return (
    <Card className="hidden-gem-card relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:border-amber-400 hover:ring-2 hover:ring-amber-300/60">
      <div className="absolute top-3 right-3">
        <Sparkles className="h-5 w-5 text-amber-300" />
      </div>
      {image ? (
        <div className="hidden-gem-image h-48 w-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="hidden-gem-placeholder h-48 w-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
          <Sparkles className="h-12 w-12 text-amber-300 opacity-60" />
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 pr-8 font-serif">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        {image && (
          <p className="text-xs text-gray-600 mb-2">Image sourced from Google Maps</p>
        )}
        {submittedBy && (
          <p className="text-xs text-muted-foreground italic">Shared by: {submittedBy}</p>
        )}
        {typeof address !== 'undefined' && address && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-amber-600" />
            <span>{address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HiddenGemCard;
