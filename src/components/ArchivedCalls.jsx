import React, { act } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  ArchiveRestore,
  MoveDownLeft,
  MoveUpRight,
  PhoneIcon,
  PhoneMissed,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "lucide-react";
import { BASE_URL, formatDate, extractTime, convertTime } from "../lib/helpers";
import { useToast } from "@/components/ui/use-toast";

const ArchivedCalls = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {toast} = useToast();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setActivities(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-grow items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-grow items-center justify-center">
        Error: {error}
      </div>
    );

  //navigate to call details
  const handleClick = (id) => {
    navigate(`/call-details/${id}`);
  };

  //sort & format dates
  const sortAndFormatDates = (activities) => {
    return activities
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((item) => ({
        ...item,
        created_at: formatDate(item.created_at),
        time: extractTime(item.created_at),
      }));
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
  const grp = Object.values(groupedActivities);
  const myActivities = sortAndFormatDates(
    grp.filter((activity) => activity.is_archived)
  );

  //PATCH to update a call
  const updateCall = async (call) => {
    try {
      await axios.patch(BASE_URL + call.id, {
        ...call,
        is_archived: false,
      });
    } catch (error) {
      console.error("Error updating call:", error);
    }
  };

  //Promise.all to update ALL
  const updateAllCalls = async () => {
    try {
      await Promise.all(activities.map((call) => updateCall(call)));
      fetchActivities();
      toast({
        title: "Calls updated",
      })
    } catch (error) {
      console.error("Error updating all calls:", error);
      alert("Failed to update all calls");
    } finally {
      setUpdating(false);
    }
  };

  if (updating)
    return (
      <div className="flex flex-grow items-center justify-center">
        Updating...
      </div>
    );

  return (
    <>
      <main className="p-4 h-96 flex-grow overflow-y-auto">
        {myActivities.length > 0 ? (
          <Button
            variant="default"
            className="w-full mb-4"
            onClick={() => updateAllCalls()}
          >
            <ArchiveRestore className="w-5 h-5 mr-2" />
            Restore all calls
          </Button>
        ) : (
          <div className="flex flex-grow justify-center items-center ">
            No data yet...
          </div>
        )}
        {myActivities.map((activity, index) => (
          <div key={index}>
            <div className="text-center text-xs text-gray-500 m-1">
              {activity.created_at}
            </div>
            <Card
              className="flex items-center justify-between p-4 hover:shadow-lg cursor-pointer"
              onClick={() => handleClick(activity.id)}
            >
              <div className="flex items-center space-x-4">
                {activity.call_type == "answered" ? (
                  <PhoneIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <PhoneMissed className="w-6 h-6 text-red-500" />
                )}
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
                    {activity.direction == "inbound" ? "Incoming" : "Outgoing"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs">{activity.time}</div>
                {activity.direction == "inbound" ? (
                  <MoveDownLeft className="w-4 h-4 text-gray-500" />
                ) : (
                  <MoveUpRight className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </Card>
          </div>
        ))}
      </main>
    </>
  );
};

export default ArchivedCalls;
