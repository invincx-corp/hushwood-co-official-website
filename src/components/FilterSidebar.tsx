import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { venues, requirements } from "@/data/products";
import { X } from "lucide-react";

interface FilterSidebarProps {
  selectedOccasions: string[];
  selectedVenues: string[];
  selectedRequirements: string[];
  customizableOnly: boolean;
  onOccasionChange: (occasions: string[]) => void;
  onVenueChange: (venues: string[]) => void;
  onRequirementChange: (requirements: string[]) => void;
  onCustomizableChange: (customizable: boolean) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({
  selectedOccasions,
  selectedVenues,
  selectedRequirements,
  customizableOnly,
  onOccasionChange,
  onVenueChange,
  onRequirementChange,
  onCustomizableChange,
  onClearFilters
}: FilterSidebarProps) => {
  const [showAllOccasions, setShowAllOccasions] = useState(false);
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [showAllRequirements, setShowAllRequirements] = useState(false);

  const occasionOptions: Array<{ label: string; value: string }> = [
    { label: "Birthdays", value: "birthday" },
    { label: "Anniversary", value: "anniversary" },
    { label: "Family Events", value: "family_events" },
    { label: "Friends Events", value: "friends_events" },
    { label: "Wedding", value: "wedding" },
    { label: "Engagement", value: "engagement" },
    { label: "Bridal Shower", value: "bridal_shower" },
    { label: "Bacheloratte", value: "bacheloratte" },
    { label: "Festivals", value: "festivals" },
    { label: "Corporate Event", value: "corporate_event" },
    { label: "Private Event", value: "private_event" },
    { label: "Public Event", value: "public_event" },
    { label: "Govt Event", value: "govt_event" },
    { label: "Inaugration/Launch", value: "inaugration_launch" },
    { label: "Retirement/Farewell", value: "retirement_farewell" },
    { label: "Baby Shower", value: "baby shower" },
    { label: "Naming Ceremony", value: "naming ceremony" },
    { label: "Corporate Party", value: "corporate_party" },
    { label: "Awards/Recognition Event", value: "awards_recognition" },
    { label: "Marketing Event", value: "marketing_event" },
    { label: "Special Yearly Occasion", value: "special_yearly" },
    { label: "Shows/Exhibitions", value: "shows_exhibitions" },
    { label: "School/College Events", value: "school_college" },
  ];

  const occasionFilterValueToProductOccasion = (value: string): string[] => {
    switch (value) {
      case "birthday":
      case "anniversary":
      case "wedding":
      case "engagement":
      case "baby shower":
      case "naming ceremony":
        return [value];
      case "family_events":
        return ["family_events"];
      case "friends_events":
        return ["birthday", "party", "celebration"];
      case "bridal_shower":
        return ["wedding"];
      case "bacheloratte":
        return ["birthday", "party"];
      case "festivals":
        return ["festivals", "diwali", "holi", "navratri", "new year"];
      case "corporate_event":
        return ["corporate", "business"];
      case "private_event":
        return ["party", "celebration", "personal"];
      case "public_event":
        return ["public program"];
      case "govt_event":
        return ["government", "scheme", "public program"];
      case "inaugration_launch":
        return ["launch", "product launch", "scheme", "marketing", "brand activation"];
      case "retirement_farewell":
        return ["employee recognition", "appreciation", "achievement"];
      case "corporate_party":
        return ["corporate", "appreciation", "party"];
      case "awards_recognition":
        return ["award ceremony", "achievement", "employee recognition"];
      case "marketing_event":
        return ["marketing", "brand activation", "product launch"];
      case "special_yearly":
        return ["new year"];
      case "shows_exhibitions":
        return ["trade show", "exhibition"];
      case "school_college":
        return ["student"];
      default:
        return [value];
    }
  };

  const handleOccasionToggle = (occasionValue: string, checked: boolean) => {
    const productOccasions = occasionFilterValueToProductOccasion(occasionValue);

    if (checked) {
      const next = [...selectedOccasions];
      productOccasions.forEach((o) => {
        if (!next.includes(o)) next.push(o);
      });
      onOccasionChange(next);
    } else {
      onOccasionChange(selectedOccasions.filter((o) => !productOccasions.includes(o)));
    }
  };

  const handleVenueToggle = (venue: string, checked: boolean) => {
    if (checked) {
      onVenueChange([...selectedVenues, venue]);
    } else {
      onVenueChange(selectedVenues.filter(v => v !== venue));
    }
  };

  const handleRequirementToggle = (requirement: string, checked: boolean) => {
    if (checked) {
      onRequirementChange([...selectedRequirements, requirement]);
    } else {
      onRequirementChange(selectedRequirements.filter(r => r !== requirement));
    }
  };

  const totalFilters = selectedOccasions.length + selectedVenues.length + selectedRequirements.length + (customizableOnly ? 1 : 0);

  return (
    <Card className="sticky top-16 sm:top-20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {totalFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear ({totalFilters})
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Customization Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Customization</h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="customizable"
              checked={customizableOnly}
              onCheckedChange={onCustomizableChange}
            />
            <label htmlFor="customizable" className="text-sm">Customizable Only</label>
          </div>
        </div>

        <Separator />

        {/* Occasion Filters */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Occasions</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {(showAllOccasions ? occasionOptions : occasionOptions.slice(0, 6)).map((occasion) => (
              <div key={occasion.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`occasion-${occasion.value}`}
                  checked={occasionFilterValueToProductOccasion(occasion.value).some((o) => selectedOccasions.includes(o))}
                  onCheckedChange={(checked) => handleOccasionToggle(occasion.value, checked as boolean)}
                />
                <label htmlFor={`occasion-${occasion.value}`} className="text-sm">
                  {occasion.label}
                </label>
              </div>
            ))}
          </div>
          {occasionOptions.length > 6 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAllOccasions(!showAllOccasions)}
              className="text-xs"
            >
              {showAllOccasions ? 'Show Less' : `Show All (${occasionOptions.length})`}
            </Button>
          )}
        </div>

        <Separator />

        {/* Venue Filters */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Venues</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {(showAllVenues ? venues : venues.slice(0, 6)).map((venue) => (
              <div key={venue} className="flex items-center space-x-2">
                <Checkbox 
                  id={`venue-${venue}`}
                  checked={selectedVenues.includes(venue)}
                  onCheckedChange={(checked) => handleVenueToggle(venue, checked as boolean)}
                />
                <label htmlFor={`venue-${venue}`} className="text-sm capitalize">
                  {venue}
                </label>
              </div>
            ))}
          </div>
          {venues.length > 6 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAllVenues(!showAllVenues)}
              className="text-xs"
            >
              {showAllVenues ? 'Show Less' : `Show All (${venues.length})`}
            </Button>
          )}
        </div>

        <Separator />

        {/* Requirements Filters */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Requirements</h4>
          <div className="space-y-2">
            {(showAllRequirements ? requirements : requirements.slice(0, 4)).map((requirement) => (
              <div key={requirement} className="flex items-center space-x-2">
                <Checkbox 
                  id={`req-${requirement}`}
                  checked={selectedRequirements.includes(requirement)}
                  onCheckedChange={(checked) => handleRequirementToggle(requirement, checked as boolean)}
                />
                <label htmlFor={`req-${requirement}`} className="text-sm capitalize">
                  {requirement}
                </label>
              </div>
            ))}
          </div>
          {requirements.length > 4 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAllRequirements(!showAllRequirements)}
              className="text-xs"
            >
              {showAllRequirements ? 'Show Less' : `Show All (${requirements.length})`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};