import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const HiddenGemCard = ({ name, description, submittedBy }) => {
  return (
    <Card className="relative overflow-hidden  transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:border-amber-400 hover:ring-2 hover:ring-amber-300/60">
      <div className="absolute top-3 right-3">
        <Sparkles className="h-5 w-5 text-amber-300" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 pr-8 font-serif">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        {submittedBy && (
          <p className="text-xs text-muted-foreground italic">
            Shared by: {submittedBy}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default HiddenGemCard;
