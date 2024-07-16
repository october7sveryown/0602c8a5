import React, { act } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import ActivityDetails from "./ActivityDetails";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MoveDownLeft, MoveUpRight, PhoneIcon, PhoneMissed } from "lucide-react";

const ActivityCard = ({ activities }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const extractTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sortAndFormatDates = (activities) => {
    return activities
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((item) => ({
        ...item,
        created_at: formatDate(item.created_at),
        time: extractTime(item.created_at),
      }));
  };

  const handleClick = (id) => {
    navigate(`/call-details/${id}`);
  };

  // Group calls by phone number
  const groupedActivities = activities.reduce((acc, activity) => {
    const { from } = activity;
    if (!acc[from]) {
      acc[from] = { ...activity, count: 1 };
    } else {
      acc[from].count += 1;
    }
    return acc;
  }, {});

  // Convert grouped activities back to an array
  activities = Object.values(groupedActivities);

  activities = sortAndFormatDates(activities);

  return (
    <>
      {activities.map((activity, index) => (
        <div key={index}>
          <div className="text-center text-xs text-gray-500 m-1">
            {activity.created_at}
          </div>
          <Card
            className="flex items-center justify-between p-4 hover:shadow-lg cursor-pointer"
            onClick={() => handleClick(activity.id)}
          >
            <div className="flex items-center space-x-4">
              {
                (activity.call_type == "answered") ? <PhoneIcon className="w-6 h-6 text-green-500" /> : <PhoneMissed className="w-6 h-6 text-red-500" />
              }
              <div>
                <div className="flex">
                  <div className="font-bold">{activity.from}</div>
                  {activity.count > 1 && (
                    <Badge variant="primary" className="flex ml-1">
                      {activity.count}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                {
                (activity.direction=="inbound") ? "Incoming" : "Outgoing" 
              }
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs">{activity.time}</div>
              {
                (activity.direction=="inbound") ? <MoveDownLeft className="w-4 h-4 text-gray-500" /> : <MoveUpRight className="w-4 h-4 text-gray-500" /> 
              }
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ActivityCard;
