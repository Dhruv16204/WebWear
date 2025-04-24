import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hovered || rating);

        return (
          <Button
            key={star}
            onClick={() => handleRatingChange?.(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            variant="ghost"
            size="icon"
            className={`p-2 transition-all rounded-full border hover:bg-gray-100`}
          >
            <StarIcon
              className={`w-6 h-6 transition-colors ${
                isActive ? "fill-black text-black" : "fill-transparent text-black"
              }`}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default StarRatingComponent;
