import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SuccessObject {
  data?: {
    message?: string;
  };
  message?: string;
}

/**
 * Determine response of handler
 * @param {string} alternateMessage
 * @param {object} data
 * @returns {string}
 */
const handlerResponse = (alternateMessage: string, data: any = {}): string => {
  if (data.data && data.data.message) {
    return data.data.message;
  }
  return alternateMessage;
};

/**
 * Parse success response from server
 * @param {*} successObject
 * @param {boolean} shouldDispatchAlert
 * @returns {string}
 */
const handler = (
  successObject: SuccessObject,
  shouldDispatchAlert: boolean = false
): string => {
  try {
    if (successObject.data) {
      if (successObject.data.message) {
        // Send found success message to alert
        shouldDispatchAlert &&
          toast.success(successObject?.data?.message, {
            position: "top-right" as ToastPosition,
            theme: "colored",
          });
      } else {
        // Send generic success message to alert
        shouldDispatchAlert &&
          toast.success("Success", {
            position: "top-right" as ToastPosition,
            theme: "colored",
          });
      }

      // Return a response
      return handlerResponse("Request was successful!", successObject);
    } else if (successObject.message) {
      // Send found success message to alert
      shouldDispatchAlert &&
        toast.success(successObject?.message, {
          position: "top-right" as ToastPosition,
          theme: "colored",
        });

      // Return a response
      return handlerResponse("Request was successful!", successObject);
    } else {
      // Send generic info message to alert
      shouldDispatchAlert &&
        toast.info("Application is Unavailable", {
          position: "top-right" as ToastPosition,
          theme: "colored",
        });

      // Return a response
      return handlerResponse("Try again", successObject);
    }
  } catch (error) {
    console.log(
      "Success Handler System Failure - Error Experienced In Processing Success Object",
      error
    );
    return "";
  }
};

export default handler;
