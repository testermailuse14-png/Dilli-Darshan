import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const HiddenGemsSubmit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitter, setSubmitter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !submitter) {
      toast.error("Please fill in all fields");
      return;
    }

    // In a real app, this would save to a database
    toast.success("Thank you for sharing this hidden gem!");

    // Reset form
    setName("");
    setDescription("");
    setSubmitter("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-6 w-6 text-amber-300" />
          Share a Hidden Gem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gem-name">Place Name</Label>
            <Input
              id="gem-name"
              placeholder="Enter the name of the place..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gem-description">Description</Label>
            <Textarea
              id="gem-description"
              placeholder="Tell us what makes this place special..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submitter-name">Your Name</Label>
            <Input
              id="submitter-name"
              placeholder="Enter your name..."
              value={submitter}
              onChange={(e) => setSubmitter(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
            Submit Hidden Gem
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HiddenGemsSubmit;
