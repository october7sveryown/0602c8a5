import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { BASE_URL,formatDate, extractTime,convertTime } from "../lib/helpers";


const ActivityDetails = (trigger) => {
  const id = useParams();

  const {toast} = useToast();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        BASE_URL + id.id
      );
      setDetails(response.data);
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

    //Update a call
    const updateCall = async (call) => {
        try {
            const response = await axios.patch(
              BASE_URL + id.id,
              {
                is_archived : !call.is_archived
              }
            );
            fetchActivities();
            toast({
                title: "Call updated",
              })
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

  return (
    <>
      <div className="flex flex-grow">
        <Card className="w-full m-2 max-h-72">
          <CardHeader>
            <CardTitle className="text-md">
              {details.direction == "inbound" ? "Incoming" : "Outgoing"} call
              details
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {details.call_type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-xs my-1">From : {details.from} </p>
              <p className="text-xs my-1">To : {details.to} </p>
              <p className="text-xs my-1">
                Duration : {convertTime(details.duration)}{" "}
              </p>
              <p className="text-xs my-1">
                Time : {formatDate(details.created_at)} at{" "}
                {extractTime(details.created_at)}{" "}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full" onClick={() => updateCall(details)}>
              {details.is_archived ? "Restore" : "Archive"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ActivityDetails;
